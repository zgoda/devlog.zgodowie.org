import type { Page } from 'astro';

export function getPageNumbers(page: Page, windowSize = 7) {
  let first = 1;
  let last = page.lastPage;
  const halfWindowSize = Math.floor(windowSize / 2);
  const rightMargin = page.lastPage - page.currentPage;
  if (page.currentPage <= halfWindowSize) {
    if (page.lastPage > windowSize) {
      last = windowSize;
    }
  } else if (rightMargin <= halfWindowSize) {
    first = Math.max(page.lastPage - windowSize + 1, first);
  } else {
    first = Math.max(page.currentPage - halfWindowSize, first);
    last = Math.min(page.currentPage + halfWindowSize, last);
  }
  const pageNumbers = Array(last - first + 1)
    .fill(0)
    .map((_, index) => first + index);
  return pageNumbers;
}
