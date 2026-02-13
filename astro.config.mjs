// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

function rehypeLazyImages() {
  /** @param {import('hast').Root} tree */
  return (tree) => {
    /** @param {import('hast').Root | import('hast').Element} node */
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
      if ('children' in node) node.children.forEach(/** @type {any} */ (visit));
    }
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.omid-saadat.com',
  integrations: [svelte(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    rehypePlugins: [rehypeLazyImages],
  },
});