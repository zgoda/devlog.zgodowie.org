import { getCollection } from 'astro:content';

export async function loadAndFormatCollection(name) {
  const posts = await getCollection(name);
  posts
    .sort((a, b) => b.data.pubDate - a.data.pubDate)
    .forEach((post) => {
      const date = post.data.pubDate;
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      post.slug = `${year}/${month}/${post.slug}`;
    });
  return posts;
}
