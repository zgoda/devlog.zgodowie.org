import { marked } from 'marked';
import type { LinkData } from '../types';

export function isPostTechRelated(meta: Record<string, unknown>) {
  if (meta.isTechRelated) {
    return true;
  }
  return false;
}

export function parseLinksDataset(links: LinkData[]) {
  const categories = new Map();
  links.forEach((link) => {
    const parsedLink = {
      name: link.name,
      url: link.url,
      description: marked.parse(link.description),
    };
    if (!categories.has(link.category)) {
      categories.set(link.category, []);
    }
    categories.set(link.category, [...categories.get(link.category), parsedLink]);
  });
  return Array.from(categories);
}
