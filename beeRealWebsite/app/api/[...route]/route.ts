import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { db } from '@/lib/prisma';
export const runtime = 'edge';
import { cors } from 'hono/cors';

const app = new Hono().basePath('/api').use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? 'https://joinbeereal.com' : '*',
    allowMethods: ['GET', 'POST'],
  })
);

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});
app.get('/coupons', async (c) => {
  const url = c.req.query('url');
  const coupons = await db.store.findFirst({
    where: {
      url,
    },
    select: {
      Coupon: {
        select: {
          code: true,
        },
      },
    },
  });
  const codes = coupons?.Coupon.map((coupon) => coupon.code) || [];
  return c.json({
    codes,
  });
});

export const GET = handle(app);
export const POST = handle(app);
