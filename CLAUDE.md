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
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`
- **CMS:** Sveltia CMS at /admin (`public/admin/config.yml`) edits blog posts via GitHub, auth through a Cloudflare worker

`npm run build` runs both steps (astro build → pagefind).

## Directory Structure

```
src/
  pages/           → Astro page routes (index "Now", showreel, writing, about, career, 404, rss.xml.ts)
  pages/writing/   → [...slug].astro for individual blog posts
  content/blog/    → Markdown blog posts
  components/      → Sidebar.astro, Search.svelte (Pagefind modal), ShaderBg.svelte (WebGL background)
  layouts/         → Base.astro (sidebar+main), Post.astro (blog posts)
  lib/posts.ts     → Sorted post list + image resolution for content lists
  styles/          → global.css (single file, all styles)
public/assets/img/ → All images
public/admin/      → Sveltia CMS
public/sw.js       → Kill-switch that unregisters the old Jekyll service worker; keep it
```

## Layout Architecture

- **Base.astro** — Root layout. Renders Sidebar + `<main>` area with footer, plus the persisted ShaderBg and Search islands. Accepts `activePage` prop for sidebar nav highlighting.
- **Sidebar.astro** — Fixed 260px left sidebar: profile photo, name, "Creative Technologist" title, location (with Farsi), vertical nav links (Now, Showreel, Writing, About, Career), search button (⌘K / Ctrl+K), footer links (GitHub, LinkedIn, Email).
- **ShaderBg.svelte** — Subtle interactive WebGL dot-grid background that reacts to the mouse and hovered items. Keep it quiet.
- **Search.svelte** — Pagefind search modal, opened by the sidebar button or ⌘K / Ctrl+K.
- **Post.astro** — Blog post layout wrapping Base.astro. Handles mermaid diagrams, RTL, embedded X posts (runs X's script again after in-site navigation), click-to-zoom for post pictures and the before/after bar (`<div class="compare" data-video data-poster data-left data-right>`: one video with the two pictures side by side, drawn on a canvas with a bar to drag).
- No separate Nav, Footer, or decorative components. Footer is inline in Base.astro.

## Showreel and Career

- **Showreel** (`/showreel`): the visual portfolio. A curated list in `showreel.astro`; each tile links to its blog post and is skipped when the post is missing or a draft. Old 3D work without a post shows without a link. Moving tiles are silent looping MP4s (`public/assets/video/showreel/`, posters in `public/assets/img/showreel/`): no controls, they play while on screen and pause off screen; with reduced motion only the poster shows. The page widens the content column to 1200px.
- **Career** (`/career`): a short, general account of where Omid has worked, grouped by country, with a pure HTML/CSS timeline of overlapping disciplines. No CV claims, numbers or downloadable PDF: CVs are written per role and live outside the site. `/resume` redirects here.

## Content Collections

Defined in `src/content.config.ts`:
- **blog**: title, date, tags, description, image, lang (en|fa), dir (ltr|rtl), mermaid, draft, order, wide, meta, translation

`translation` is the slug of the same post in the other language. Both posts name each other; Post.astro shows a link to the other one beside the date, and only the English post appears in lists and the RSS feed.

The `image` field is used for background images on homepage content list items. Set to an absolute path like `/assets/img/blog/openshadergraph/OSG_01.png`.

## Writing Posts

Posts go out in Omid's name, so they are written in his voice. Read `src/content/blog/open-flowmap.md` before you write one; it is the reference.

- First person, plain and casual, as he tells a friend what he made: short sections with headings such as "Idea:" or "Where is the camera?", short paragraphs, simple words.
- A picture after every few paragraphs: a GIF, screenshot, frame or simple drawing of what the text explains, with a short italic caption when needed. Make them from the project's own material.
- Only what happened and what he said: no feelings, opinions or lessons he did not state.
- Before a post goes live, run `npm run build`, serve it with `npx astro preview --port 4399 --host 127.0.0.1`, and open the post in Omid's own Chrome for him to read. Merge to `main` and push only after his word, because a push to `main` publishes the site (Omid, 2026-11-13: «اول لوکال سرو کن و توی مرورگرم باز کن تا خودم ببینم. از این به بعد هم پست های جدید سایتم رو اول اینجوری بررسی کنیم.»).
- A step diagram is plain HTML, `<ol class="flow">` with `<li><b>Step</b><span>detail</span></li>` (styled in global.css), not mermaid: Omid found the mermaid graph plain (2026-11-12). An X post is its `<blockquote class="twitter-tweet">` alone; Post.astro loads X's script.
- Wrong (Omid, 2026-11-12): a 1,900-word post about the Tehran clouds simulation with one video, bold-lead bullet lists, polished contrasts ("That is not what the agent built") and a closing lesson in his name ("What stays with me is the split of work"). His reply: «عکس های مقاله خیلی کمه. متن مقاله بوی ai slop میده و اصلاً مثل نوشته‌های خودم نیست.»

## Design Rules

- Dark cool theme with Chirpy-inspired blue accent. Background: #1b1b1e. Text: #d2d2d2. Accent: #6cb4ee (single accent, no secondary colors)
- Fixed sidebar layout (260px left) with profile, nav, footer links. Main content to the right.
- All theme values are CSS custom properties in :root (defined in global.css)
- Interactions should feel buttery and responsive (0.3s–0.5s transitions, cubic-bezier springs)
- Homepage content list items show background images on right side via `.item-bg` div. Featured item (first) has image always partially visible; others reveal on hover. Images transition grayscale→color with increased brightness.
- Mobile (≤768px): sidebar collapses to sticky horizontal top bar with backdrop blur. No hamburger menu. Below 560px the nav links take their own row under the name.
- No hero section. Greeting is a small serif paragraph at top of content area.
- No cursor glow, ambient orbs, or card grid. Removed in v5 redesign. The only background effect is ShaderBg.

## Code Conventions

- NO unnecessary dependencies. Keep the list minimal (astro + its integrations, svelte, typescript; pagefind as a dev dep).
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
- Don't re-add a resume page or a downloadable CV
- Don't use warm/terracotta colors — the palette is cool-toned blue
