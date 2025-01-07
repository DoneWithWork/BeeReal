import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export type Coupon = {
  code: string;
};
type CouponResponse = {
  codes: string[];
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchCoupouns = async (
  url: string,
  setCoupons: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://joinbeereal.com/api/coupons?url=${url}`
    );
    if (!response.ok) {
      console.error('Failed to fetch coupons');
      setCoupons([]);
      return;
    }
    const data: CouponResponse = await response.json();
    console.log('Fetched Coupons', data);
    chrome.runtime.sendMessage({
      action: 'setBadgeText',
      text: data.codes.length.toString(),
    });
    setCoupons(data.codes || []);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    setCoupons([]);
  } finally {
    setLoading(false);
  }
};
