import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date(),
    author: z.enum(['Jarek']).default('Jarek'),
    draft: z.boolean().default(false),
    imageUrl: z.string().optional(),
    isTechRelated: z.boolean().default(false),
  }),
});

export const collections = { blog };
