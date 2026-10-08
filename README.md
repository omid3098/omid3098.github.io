# omid-saadat.com

Source for [www.omid-saadat.com](https://www.omid-saadat.com), the personal site of Omid Saadat. Built with Astro and Svelte, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev       # local dev server at localhost:4321
npm run build     # astro build, then the Pagefind search index
npm run preview   # serve the built site
```

## Writing

Blog posts are Markdown files in `src/content/blog/` (frontmatter schema in `src/content.config.ts`). They can also be edited through the CMS at `/admin`. Farsi posts use `lang: fa` and `dir: rtl`; posts with diagrams set `mermaid: true`.

## Deploy

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
