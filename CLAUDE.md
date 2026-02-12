# Omid Saadat — Personal Website

## Project Overview

Personal website for Omid Saadat (Technical Artist at Ubisoft Blue Byte, Düsseldorf).
Rebuilt from Jekyll/Chirpy into Astro + Svelte. The site should feel like meeting a person, not reading a resume.

Live domain: omid-saadat.com
Visual reference: homepage-v4.html (in project root)

## Tech Stack

- **Framework:** Astro 5
- **Interactive islands:** Svelte 5 (via @astrojs/svelte)
- **Content:** Markdown in Astro content collections (blog + work)
- **Styling:** Single global.css — NO Tailwind, NO component libraries
- **Fonts:** Literata (serif), DM Sans (sans), Vazirmatn (Farsi) — Google Fonts
- **Deployment:** Static output, platform TBD (Vercel or Netlify)

## Directory Structure

```
src/
  pages/           → Astro page routes (index, work, writing, about, resume)
  pages/writing/   → [...slug].astro for individual blog posts
  pages/work/      → [...slug].astro for individual project pages
  content/blog/    → Markdown blog posts (migrated from Jekyll)
  content/work/    → Markdown project descriptions
  components/      → Astro + Svelte components
  layouts/         → Base.astro, Post.astro, Project.astro
  styles/          → global.css (single file, all styles)
public/assets/img/ → All images (migrated from Jekyll)
```

## Content Collections

Defined in `src/content.config.ts`:
- **blog**: title, date, tags, description, lang (en|fa), dir (ltr|rtl), mermaid, draft
- **work**: title, date, tag, excerpt, meta, url, wide, order, draft

## Design Rules

- Dark warm theme. Background: #0F0F0E (NOT pure black). Text: #E5E1DB. Accent: #CC7E5A
- All theme values are CSS custom properties in :root (defined in global.css)
- Animations must be subtle — almost imperceptible. No flashy transitions.
- Card hover: background lightens only. No shadows, no transforms.
- Mobile nav: keep horizontal links visible (no hamburger menu)

## Code Conventions

- NO unnecessary dependencies. The dependency list should stay minimal (astro, svelte, typescript).
- NO CSS frameworks or component libraries.
- Prefer Astro components for static content. Use Svelte only when client-side interactivity is needed.
- Svelte hydration directives: `client:load` for immediately needed (CursorGlow), `client:visible` for below-fold (TheseDays).
- Keep it flat and simple — avoid premature abstractions.
- Don't categorize content by job role. Projects, writing, and ideas all mix together.

## RTL / Farsi Support

- Per-post via frontmatter: `lang: fa`, `dir: rtl`
- Post.astro passes lang/dir to Base.astro → sets on `<html>`
- CSS class `.rtl` switches to Vazirmatn font and right-to-left layout

## Mermaid Diagrams

- Client-side rendering via CDN ESM module (no build-time plugin)
- Only loaded on posts with `mermaid: true` in frontmatter
- Themed to match site's dark palette

## What NOT To Do

- Don't use Tailwind or any CSS framework
- Don't add dependencies unless absolutely necessary
- Don't over-animate anything
- Don't make it look like a tech blog template
- Don't categorize by role ("As a Technical Artist", "As a Programmer")
- Don't add features or content not confirmed by the user — ask first
- Don't create documentation files unless requested
