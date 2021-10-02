import { PREV_LINK_TEXT_RE } from '../constants';

export function scorePrevLink(linkData: string) {
  // If the link has something like "previous", its definitely
  // an old link, skip it.
  if (PREV_LINK_TEXT_RE.test(linkData)) {
    return -200;
  }

  return 0;
}
