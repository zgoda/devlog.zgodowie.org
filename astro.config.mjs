import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://devlog.zgodowie.org',
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
});
