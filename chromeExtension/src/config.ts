export const LOCAL_BASE_URL = 'http://localhost:3000';
export const PROD_BASE_URL = 'https://beereal.vercel.app';
export const BASE_URL =
  process.env.NODE_ENV === 'production' ? PROD_BASE_URL : LOCAL_BASE_URL;
