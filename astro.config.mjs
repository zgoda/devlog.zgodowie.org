import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './remark-modified-time';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  prefetch: true,
  site: 'https://devlog.zgodowie.org',
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkModifiedTime],
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } } })],
});
