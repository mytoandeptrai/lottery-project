export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || '/v1',
  API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX || '/api',
};

export const NUMBER_FORMAT_LOOK_UP = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'P' },
  { value: 1e18, symbol: 'E' },
];

export const IMAGE_TYPE = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
export const VIDEO_TYPE = ['mp4', 'mov', 'webm', 'ogg', 'wmv'];

export const FILE_FORMAT = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/svg',
  'image/gif',
  'image/svg+xml',
];

export const REFRESH_INTERVAL = 10000;
export const REFRESH_INTERVAL_DRAW = 10000;
export const DEFAULT_POLLING_INTERVAL = 4000;
export const TICKET_PRICE = 0.001 * 10 ** 18;
export const NUMBER_OF_BLOCK_CONFIRMATION = 1;
export const TICKET_PRICE_FOR_ADMIN = 0.0001 * 10 ** 18;