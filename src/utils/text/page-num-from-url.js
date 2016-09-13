import { PAGE_IN_HREF_RE } from './constants';

export default function pageNumFromUrl(url) {
  const matches = url.match(PAGE_IN_HREF_RE);
  if (!matches) return null;

  const pageNum = parseInt(matches[6], 10);

  // Return pageNum < 100, otherwise
  // return null
  return pageNum < 100 ? pageNum : null;
}
