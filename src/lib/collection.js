import { getCollection } from 'astro:content';

/**
 * @param {number} [limit]
 * @returns {Promise<import('astro:content').CollectionEntry[]>}
 */
export async function loadAndFormatPostsCollection(limit = null) {
  const posts = await getCollection('blog');
  posts
    .sort((a, b) => b.data.pubDate - a.data.pubDate)
    .forEach((post) => {
      if (post.slug.split('/').length !== 3) {
        const date = post.data.pubDate;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        post.slug = `${year}/${month}/${post.slug}`;
      }
    });
  if (limit != null) {
    return posts.slice(0, limit);
  }
  return posts;
}

/**
 * @param {number} [limit]
 * @returns {Promise<import('astro:content').CollectionEntry[]>}
 */
export async function loadAndFormatLinksCollection(limit = null) {
  const links = await getCollection('links');
  links.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1;
    }
    if (b.slug < a.slug) {
      return 1;
    }
    return 0;
  });
  if (limit != null) {
    return links.slice(0, limit);
  }
  return links;
}
