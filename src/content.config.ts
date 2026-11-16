import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    description: z.string().optional(),
    image: z.string().optional(),
    lang: z.enum(['en', 'fa']).optional().default('en'),
    dir: z.enum(['ltr', 'rtl']).optional().default('ltr'),
    draft: z.boolean().optional().default(false),
    mermaid: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
    wide: z.boolean().optional().default(false),
    meta: z.string().optional(),
    // Slug of the same post in the other language. Only the English one of the pair is listed.
    translation: z.string().optional(),
    // A project post opens like the project's own home page: icon, tagline, links and its main clip.
    // `prompt` adds a closing section with an install prompt to copy into a coding agent.
    hero: z.object({
      tagline: z.string(),
      sub: z.string().optional(),
      icon: z.string().optional(),
      clip: z.string().optional(),
      clipAlt: z.string().optional(),
      clipWidth: z.number().optional(),
      clipHeight: z.number().optional(),
      prompt: z.string().optional(),
      links: z.array(z.object({ label: z.string(), href: z.string(), primary: z.boolean().optional() })).optional().default([]),
    }).optional(),
  }),
});

export const collections = { blog };
