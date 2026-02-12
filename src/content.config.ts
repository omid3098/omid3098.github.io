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
  }),
});

export const collections = { blog };
