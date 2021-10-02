import { PAGE_IN_HREF_RE } from './constants';

export function pageNumFromUrl(url: string) {
  const matches = url.match(PAGE_IN_HREF_RE);
  if (!matches) {
    return undefined;
  }

  const pageNum = parseInt(matches[6], 10);

  // Return pageNum < 100, otherwise
  // return null
  return pageNum < 100 ? pageNum : undefined;
}
