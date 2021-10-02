import { NEXT_LINK_TEXT_RE, CAP_LINK_TEXT_RE } from '../constants';

export function scoreCapLinks(linkData: string) {
  // Cap links are links like "last", etc.
  if (CAP_LINK_TEXT_RE.test(linkData)) {
    // If we found a link like "last", but we've already seen that
    // this link is also "next", it's fine. If it's not been
    // previously marked as "next", then it's probably bad.
    // Penalize.
    if (NEXT_LINK_TEXT_RE.test(linkData)) {
      return -65;
    }
  }

  return 0;
}
