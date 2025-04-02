import { appConfig } from '.';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: appConfig.appUrl,
  name: 'Lottery',
  metaTitle: 'Lottery',
  description: 'Buy tickets, win prizes, have fun!',
  ogImage: `${appConfig.appUrl}/og-image.jpg`,
};
