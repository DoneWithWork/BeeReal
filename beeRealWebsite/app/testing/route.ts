import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || '';
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
  return Response.json({
    codes,
  });
}
