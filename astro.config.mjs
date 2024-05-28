import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './remark-modified-time';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import remarkGfm from 'remark-gfm';

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
          disallow: '/'
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/'
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/'
        },
        {
          userAgent: 'CCBot',
          disallow: '/'
        },
        {
          userAgent: 'PerplexityBot',
          disallow: '/'
        }
      ]
    }),
  ],
});
