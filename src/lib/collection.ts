import { getCollection } from 'astro:content';

export async function loadAndFormatPostsCollection(
  limit?: number,
): Promise<import('astro:content').CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  if (limit != null) {
    return posts.slice(0, limit);
  }
  return posts;
}
