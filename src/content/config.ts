import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
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

const links = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, links };
