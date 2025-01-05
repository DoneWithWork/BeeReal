import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';
import fs from 'fs';
const prisma = new PrismaClient();
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

type Store = {
  name: string;
  url: string;
};
async function main() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for running without UI
    devtools: true, // Open devtools for debugging
  });

  const grabStore = async (letter: string) => {
    const page = await browser.newPage();
    await page.goto(`https://couponfollow.com/site/browse/${letter}/all`, {
      waitUntil: 'domcontentloaded',
    });

    try {
      const storeLinks = await page.$$eval('.store-link', (elements) =>
        elements.map((element) => ({
          name: element.textContent?.replace('Coupons', '').trim() || '',
          url: element.getAttribute('href')?.split('/')[2] || '',
        }))
      );
      console.log(`Links for ${letter}:`, storeLinks);

      return storeLinks; // Return the collected links here
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error grabbing stores for ${letter}:`, error.message);
      } else {
        console.error(`Error grabbing stores for ${letter}:`, error);
      }
      return []; // Return an empty array in case of error
    } finally {
      await page.close();
    }
  };

  const data = await Promise.all(letters.map(grabStore)); // Wait for all promises to resolve
  const flatData = data.flat();
  const records = await prisma.store.createMany({
    data: flatData,
    skipDuplicates: true,
  });
  if (!records) {
    throw new Error('Error saving data to database');
  }
  downloadJSON(flatData);
  console.log('Data:', flatData);
  console.log("Data saved to 'data.json'");
}
main()
  .then(async () => {
    console.log('Done');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
function downloadJSON(data: Store[], filename = 'data.json') {
  const json = JSON.stringify(data, null, 2); // Convert the data to a JSON string
  fs.writeFileSync(filename, json); // Write the JSON string to a file
  console.log(`File saved as ${filename}`);
}
