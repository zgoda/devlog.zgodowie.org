import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    pubDate: z.date(),
    author: z.enum(['Jarek']),
  }),
});

export const collections = { blog };
