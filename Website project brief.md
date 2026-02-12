# Personal Website Redesign — Project Brief for Claude Code

You are helping me rebuild my personal website from scratch. This document contains every decision I've made about content, UX, design, and technical architecture. Follow it precisely.

---

## Who I Am

I'm Omid Saadat, a Technical Artist at Ubisoft Blue Byte in Düsseldorf. But this website is NOT about my job title. It's about me as a person who happens to also make tools and shaders for games.

My current website: https://www.omid-saadat.com  
Current repo: https://github.com/omid3098/omid3098.github.io (Jekyll + Chirpy theme)  
GitHub profile: https://github.com/omid3098

---

## Core Philosophy

The website should feel like meeting a person, not reading a resume. When someone leaves the site, they should think "interesting person" not "good technical artist."

Key principles:
- **Human first, professional second.** No "As a Technical Artist / As a Programmer" categories.
- **Layered depth.** First you see how I think, then my work, then who I am. Like a real conversation.
- **Living site.** The "these days" section shows I'm actively building things.
- **Mixed content.** Tools, shaders, blog posts about ideas, and personal projects all live together — because they all come from the same mind.

---

## Tech Stack

- **Framework:** Astro
- **Interactive components:** Svelte (via Astro Islands)
- **Content:** Markdown/MDX files in content collections
- **Styling:** Custom CSS (no Tailwind, no component library). Dark theme.
- **Deployment:** Vercel or Netlify (with GitHub integration, auto-deploy on push)
- **Domain:** omid-saadat.com (existing, will be pointed to new host)

---

## Site Structure

### Pages

```
/                   → Homepage ("living room")
/work               → All projects
/writing            → All blog posts (supports both English and Farsi posts)
/about              → Full about page
/resume             → Professional resume page
```

### Content Directory Structure

```
src/
  pages/
    index.astro
    work.astro
    writing.astro
    about.astro
    resume.astro
  content/
    blog/                    ← Markdown posts (migrated from Jekyll)
    work/                    ← Project descriptions
  components/
    Nav.astro
    Footer.astro
    TheseDay.svelte          ← Interactive "these days" section
    ProjectCard.astro
    PostCard.astro
    CursorGlow.svelte        ← Subtle cursor light effect
  layouts/
    Base.astro               ← Main layout (dark theme, fonts, meta)
    Post.astro               ← Blog post layout
    Project.astro            ← Project page layout
  styles/
    global.css               ← All custom styles
public/
  assets/
    img/                     ← Migrated from Jekyll assets/img/
```

---

## Homepage Content (Confirmed & Final)

### Hero Section

**Headline:**
```
If something feels too complicated, I'll probably do something about it.
```
(The italic/accent emphasis should be on "do something about it.")

**Body paragraph:**
```
In games, that meant building tools so artists could focus on art instead of
debugging broken assets. Last week it meant writing a script that turns a
30-minute server setup into one command. The context changes, the instinct doesn't.
```

### "These Days" Section

This section shows what I've been working on recently. In the final version, it should pull from my GitHub activity (https://github.com/omid3098) and present it in a human, narrative way — not raw commit messages.

For now, use these as static content:

1. **New repo** — Started OpenShaderGraph — a node-based shader language that doesn't care which engine you're using. Write once, use anywhere.
2. **Commits** — Pushed updates to OpenFlowMap — refactored the flow algorithm and rewrote the docs with visual explanations. (118 ★)
3. **Milestone** — Unity-URP-GlassShader crossed 270 stars — a simple shader I made because Unity's default glass looked terrible. Still finding new users.
4. **Script** — Wrote a script to automate paqet server setup — turned a long manual process into a single command that gives admins exactly what they need.

Footer of this section: "From github.com/omid3098" with link.

### "Work & Writing" Section

A grid of cards mixing projects and blog posts. Each card has:
- A tag (tool, shader, idea, guide, language)
- Title
- One-line human description (why, not what)
- Date/context

Cards to include (use wide card for the first):
1. **[wide] OpenShaderGraph** — "Every engine has its own shader editor. None talk to each other. I got frustrated enough to start building a common language." (2025)
2. **QuVery** — "Artists kept shipping broken assets. I built a validator that catches problems before they reach the engine." (Ubisoft Blue Byte · 2024)
3. **A letter to my future self** — "Sitting on the balcony, watching the sky. I built a tiny tool to send emails across time." (2024)
4. **Open FlowMap** — "Saw a beautiful water shader on Twitter. Wanted to reverse-engineer the feeling, not just the technique." (118 ★ · 2023)
5. **URP Glass Shader** — "Unity's default glass materials looked terrible. I made two versions — a lightweight one for mobile and a complex one with refraction." (270 ★ · 2022)
6. **[wide] Becoming a Technical Artist** — "A comprehensive guide for people who like both art and code and don't know there's a job title for that." (2024)

### About Teaser

Photo on the left (use /assets/img/profile-picture.png), text on the right:

```
I make things simpler for a living. In games, that usually means building
tools — validators, shader utilities, automation scripts — so artists can
focus on creating instead of debugging. But it's not just a job thing. If I
see a process that takes thirty minutes and could take one, I'll probably
end up writing something about it.

Outside of work, I spend my evenings studying the Quran — analyzing it
verse by verse with a framework I built myself, and sharing what I find.

If you're here for my tools and shaders, they're above. If you're here
because you're curious, stay a while.
```

Link: "Full about page →"

### Footer

Left side: `Düsseldorf · امید سعادت` (the Persian text is my name in Farsi — this is intentional and important)

Right side links: GitHub, LinkedIn, Resume, Say hello

---

## Design Specifications

### Theme: Dark

- Background: very dark warm gray (#0F0F0E range), NOT pure black
- Text: warm off-white (#E5E1DB range)
- Accent: warm terracotta/copper (#CC7E5A range)
- Secondary colors for activity icons: green for commits, yellow for stars, blue for ideas

### Typography

- Serif (headings, quotes): Literata
- Sans (body, UI): DM Sans
- Farsi: Vazirmatn
- Load from Google Fonts

### Interactions (subtle, not flashy)

- **Cursor glow:** A very faint warm light follows the cursor. Almost imperceptible but makes the site feel alive.
- **Ambient orbs:** Two large blurred color orbs in background that shift slightly with mouse movement.
- **Scroll reveal:** Content sections fade in as you scroll down.
- **Staggered animations:** Items in lists/grids appear one by one with slight delay.
- **Card hover:** Background lightens slightly, no shadow, no transform.
- **Photo hover:** Slight grayscale that removes on hover.

### Navigation

- Fixed top bar, transparent initially, adds backdrop blur on scroll
- Left: "Omid Saadat" (serif font, links to home)
- Right: "now", "work & writing", "about"
- Simple, minimal, no hamburger on desktop

---

## Migration from Jekyll

### Blog Posts

Current location: `_posts/` in the Jekyll repo.
Posts are named: `YYYY-MM-DD-slug.md`

Migration steps:
1. Copy all .md files from `_posts/` to `src/content/blog/`
2. Rename files: strip the date prefix (keep just the slug)
3. Update frontmatter: keep title, date, tags. Remove Jekyll-specific fields (categories, image paths if needed)
4. Update internal links from `/posts/slug` to `/writing/slug`
5. Copy all images from `assets/img/` to `public/assets/img/`

### Posts to migrate (from the blog page):

- OpenShaderGraph (Oct 2025)
- Becoming A Technical Artist (Sep 2024)
- Simple TimeCapsule Email (Aug 2024)
- QuVery (Dec 2023)
- Playing Steam Windows games on MacBook M2 (Dec 2023)
- Open FlowMap (Sep 2023)
- AI Summery So Far (Jul 2023)
- Glass Shaders (May 2023)
- ShaderGraph Baker (Jul 2022)
- CryptoRoomZ (Jan 2022)
- Joko (May 2019)
- Gambeet (Jan 2018)
- Shahrzad (Jan 2017)
- Memoranda (May 2015)
- Hello (May 2012)

### Special considerations

- Some posts use Mermaid diagrams (QuVery) — need remark-mermaid or equivalent
- Some posts have embedded images/gifs — paths must be preserved
- The blog should support future Farsi posts (RTL layout needed per-post)

---

## What NOT to do

- Don't use any CSS framework (Tailwind, Bootstrap, etc.)
- Don't add unnecessary dependencies
- Don't create a complex folder structure — keep it flat and simple
- Don't over-animate. Every animation should be subtle enough that you almost don't notice it.
- Don't categorize projects by job role ("As a Technical Artist", "As a Programmer")
- Don't make it look like a tech blog template
- Don't add things I haven't confirmed — ask me first

---

## Build Order

1. **Astro project setup** — Initialize project, configure Astro with Svelte integration, set up content collections
2. **Base layout + global CSS** — Dark theme, fonts, basic structure
3. **Homepage** — All sections with confirmed content
4. **Blog migration** — Move all posts, fix frontmatter, verify images work
5. **Writing page** — List all blog posts
6. **Work page** — List all projects
7. **About page** — Full version of the about text with photo
8. **Resume page** — Professional resume
9. **Polish** — Interactions, responsive design, meta tags, OG images
10. **Deploy** — Vercel/Netlify setup, domain connection

Start with step 1 and work through each step, showing me progress and asking for feedback before moving to the next.