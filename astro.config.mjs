import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://aiforedu.ai',
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
    routes: { strategy: 'include' },
  }),
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
  ],
  vite: {
    ssr: {
      external: ['node:buffer', 'node:crypto'],
    },
  },
});
