// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.omid-saadat.com',
  integrations: [svelte()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});