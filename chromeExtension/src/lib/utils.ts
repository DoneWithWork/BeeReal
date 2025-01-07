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
    console.log(`Fetching coupons for URL: ${url}`);
    const response = await fetch(
      `https://joinbeereal.com/api/coupons?url=${url}`
    );
    console.log('Url', url);
    if (!response.ok) {
      console.error('Failed to fetch coupons:', response.statusText);
      setCoupons([]);
      return;
    }

    const data: CouponResponse = await response.json();
    console.log('Fetched Coupons:', data);

    try {
      chrome.runtime.sendMessage({
        action: 'setBadgeText',
        text: data.codes.length.toString(),
      });
    } catch (error) {
      console.error('Failed to send message to runtime:', error);
    }

    setCoupons(data.codes || []);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    setCoupons([]);
  } finally {
    setLoading(false);
    console.log('Finished fetching coupons.');
  }
};
