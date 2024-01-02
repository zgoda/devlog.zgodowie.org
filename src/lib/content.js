import { marked } from 'marked';

export function isPostTechRelated(meta) {
  if (meta.isTechRelated) {
    return true;
  }
  return false;
}

export function parseLinksDataset(links) {
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
