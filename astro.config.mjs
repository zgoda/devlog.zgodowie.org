import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import remarkGfm from 'remark-gfm';
import { remarkModifiedTime } from './lib/remark-modified-time';

export default defineConfig({
  prefetch: true,
  site: 'https://devlog.zgodowie.org',
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkModifiedTime, remarkGfm],
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } } }),
    robotsTxt({
      policy: [
        {
          userAgent: 'GPTBot',
          disallow: '/',
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/',
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/',
        },
        {
          userAgent: 'CCBot',
          disallow: '/',
        },
        {
          userAgent: 'PerplexityBot',
          disallow: '/',
        },
      ],
    }),
  ],
  legacy: {},
});
