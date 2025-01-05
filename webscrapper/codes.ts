import puppeteer from 'puppeteer';
import fs from 'fs';
import { Store } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const baseUrl = 'https://couponfollow.com/site';
  const file = fs.readFileSync('data.json', 'utf-8');
  const stores: Store[] = JSON.parse(file);
  const MAX_CHUNK_SIZE = 10;

  const browser = await puppeteer.launch({
    headless: false,
  });

  const storeChunks = [];
  for (let i = 3082; i <= stores.length; i += MAX_CHUNK_SIZE) {
    storeChunks.push(stores.slice(i, i + MAX_CHUNK_SIZE));
  }

  for (const chunk of storeChunks) {
    await Promise.all(chunk.map((store) => grabCodes(store)));
  }

  async function grabCodes(store: Store) {
    let page;
    try {
      page = await browser.newPage();
      await page.goto(`${baseUrl}/${store.url}`, {
        waitUntil: 'domcontentloaded',
      });

      await page.waitForSelector('.offer-card', { timeout: 5000 });

      const prismaStore = await prisma.store.findFirst({
        where: { name: store.name, url: store.url },
      });
      if (!prismaStore) {
        console.error(`Store ${store.name} not found in database`);
        return;
      }

      const hiddenCodes = await page.$$eval('.offer-card', (elements) =>
        elements
          .map((element) => {
            const cid = element.getAttribute('data-cid');
            if (cid) {
              return { id: '#C' + cid };
            }
            return null;
          })
          .filter((code) => code !== null)
      );

      const revealPromises = hiddenCodes.map((code) =>
        revealCodes({ id: code.id, url: store.url })
      );
      const revealedCodes = await Promise.all(revealPromises);

      const codes = await prisma.coupon.createMany({
        data: revealedCodes.map((code) => ({
          code: code || '',
          storeId: prismaStore.id,
        })),
      });
      if (!codes) {
        console.error(`Error saving codes for ${store.name}`);
      }
    } catch (error) {
      console.error(`Error grabbing codes for ${store.name}:`, error);
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  async function revealCodes(code: { id: string; url: string }) {
    let page;
    try {
      page = await browser.newPage();
      const fullUrl = `${baseUrl}/${code.url}${code.id}`;
      console.log(`Revealing code for ${code.id} at URL: ${fullUrl}`);

      await page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.code .input', { visible: true });

      const revealedCode = await page.$eval(
        '.code .input',
        (element) => element.getAttribute('value') || ''
      );
      console.log(
        `Revealed code for ${code.id} at URL: ${fullUrl}: ${revealedCode}`
      );
      return revealedCode;
    } catch (error) {
      console.error(`Error revealing code for ${code.id}:`, error);
      return null;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  console.log('Finished revealing codes');
  await browser.close();
}

main().catch(console.error);
