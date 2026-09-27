# Omid Saadat — Personal Website

## Project Overview

Personal website for Omid Saadat, Creative Technologist based in Düsseldorf (currently at Ubisoft Blue Byte).
Rebuilt from Jekyll/Chirpy into Astro + Svelte. The site should feel like meeting a person, not reading a resume.

Live domain: www.omid-saadat.com (public/CNAME)

## Tech Stack

- **Framework:** Astro 7 (static output, ClientRouter view transitions)
- **Interactive islands:** Svelte 5 (via @astrojs/svelte)
- **Content:** Markdown in Astro content collections (blog)
- **Styling:** Single global.css — NO Tailwind, NO component libraries
- **Fonts:** Literata (serif), DM Sans (sans), Vazirmatn (Farsi) — Google Fonts
- **Integrations:** @astrojs/sitemap, @astrojs/rss (feed at /rss.xml)
- **Search:** Pagefind, indexed from `dist/` after the Astro build
- **Resume PDF:** `scripts/generate-pdf.mjs` renders /resume to `dist/resume.pdf` with Puppeteer
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`
- **CMS:** Sveltia CMS at /admin (`public/admin/config.yml`) edits blog posts via GitHub, auth through a Cloudflare worker

`npm run build` runs all three steps (astro build → pagefind → PDF). Puppeteer needs a Chrome install (`npx puppeteer browsers install chrome`).

## Directory Structure

```
src/
  pages/           → Astro page routes (index "Now", writing, about, resume, 404, rss.xml.ts)
  pages/writing/   → [...slug].astro for individual blog posts
  content/blog/    → Markdown blog posts
  components/      → Sidebar.astro, Search.svelte (Pagefind modal), ShaderBg.svelte (WebGL background)
  layouts/         → Base.astro (sidebar+main), Post.astro (blog posts)
  lib/posts.ts     → Sorted post list + image resolution for content lists
  styles/          → global.css (single file, all styles)
public/assets/img/ → All images
public/admin/      → Sveltia CMS
public/sw.js       → Kill-switch that unregisters the old Jekyll service worker; keep it
scripts/           → generate-pdf.mjs (resume PDF)
```

## Layout Architecture

- **Base.astro** — Root layout. Renders Sidebar + `<main>` area with footer, plus the persisted ShaderBg and Search islands. Accepts `activePage` prop for sidebar nav highlighting.
- **Sidebar.astro** — Fixed 260px left sidebar: profile photo, name, "Creative Technologist" title, location (with Farsi), vertical nav links (Now, Writing, About, Resume), search button (⌘K / Ctrl+K), footer links (GitHub, LinkedIn, Email).
- **ShaderBg.svelte** — Subtle interactive WebGL dot-grid background that reacts to the mouse and hovered items. Keep it quiet.
- **Search.svelte** — Pagefind search modal, opened by the sidebar button or ⌘K / Ctrl+K.
- **Post.astro** — Blog post layout wrapping Base.astro. Handles mermaid diagrams and RTL.
- No separate Nav, Footer, or decorative components. Footer is inline in Base.astro.

## Content Collections

Defined in `src/content.config.ts`:
- **blog**: title, date, tags, description, image, lang (en|fa), dir (ltr|rtl), mermaid, draft, order, wide, meta

The `image` field is used for background images on homepage content list items. Set to an absolute path like `/assets/img/blog/openshadergraph/OSG_01.png`.

## Design Rules

- Dark cool theme with Chirpy-inspired blue accent. Background: #1b1b1e. Text: #d2d2d2. Accent: #6cb4ee (single accent, no secondary colors)
- Fixed sidebar layout (260px left) with profile, nav, footer links. Main content to the right.
- All theme values are CSS custom properties in :root (defined in global.css)
- Interactions should feel buttery and responsive (0.3s–0.5s transitions, cubic-bezier springs)
- Homepage content list items show background images on right side via `.item-bg` div. Featured item (first) has image always partially visible; others reveal on hover. Images transition grayscale→color with increased brightness.
- Mobile (≤768px): sidebar collapses to sticky horizontal top bar with backdrop blur. No hamburger menu.
- No hero section. Greeting is a small serif paragraph at top of content area.
- No cursor glow, ambient orbs, or card grid. Removed in v5 redesign. The only background effect is ShaderBg.

## Code Conventions

- NO unnecessary dependencies. Keep the list minimal (astro + its integrations, svelte, typescript; pagefind and puppeteer as dev deps).
- NO CSS frameworks or component libraries.
- Prefer Astro components for static content. Use Svelte only when client-side interactivity is needed.
- Keep it flat and simple — avoid premature abstractions.
- Don't categorize content by job role. Projects, writing, and ideas all mix together.
- GitHub activity is fetched server-side in index.astro at build time, with hardcoded fallbacks.

## RTL / Farsi Support

- Per-post via frontmatter: `lang: fa`, `dir: rtl`
- Post.astro passes lang/dir to Base.astro → sets on `<html>`
- CSS class `.rtl` switches to Vazirmatn font and right-to-left layout

## Mermaid Diagrams

- Client-side rendering via CDN ESM module (no build-time plugin)
- Only loaded on posts with `mermaid: true` in frontmatter
- Themed to match site's dark palette (#232328 primary, #6cb4ee border, #d2d2d2 text)

## What NOT To Do

- Don't use Tailwind or any CSS framework
- Don't add dependencies unless absolutely necessary
- Don't over-animate anything
- Don't make it look like a tech blog template
- Don't categorize by role ("As a Technical Artist", "As a Programmer")
- Don't add features or content not confirmed by the user — ask first
- Don't create documentation files unless requested
- Don't re-add hero section, cursor glow, ambient orbs, or top navigation bar
- Don't use warm/terracotta colors — the palette is cool-toned blue
