import { getCollection } from 'astro:content';

type Post = Record<string, unknown>;
type PostData = Record<string, unknown>;

export async function loadAndFormatPostsCollection(
  limit?: number,
): Promise<import('astro:content').CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .forEach((post: Post) => {
      if ((post.slug as string).split('/').length !== 3) {
        const date = (post.data as PostData).pubDate as Date;
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        post.slug = `${year}/${month}/${post.slug}`;
      }
    });
  if (limit != null) {
    return posts.slice(0, limit);
  }
  return posts;
}
