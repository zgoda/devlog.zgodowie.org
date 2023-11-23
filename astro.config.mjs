import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: 'https://devlog.zgodowie.org',
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } } })],
});
