import rss from '@astrojs/rss';
import { loadAndFormatPostsCollection } from '../lib/collection';

export async function GET(context) {
  const posts = await loadAndFormatPostsCollection();
  return rss({
    title: 'Jarek Zgoda | Blog',
    description: 'Jarek Zgoda | Blog',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>pl-PL</language>`,
  });
}
