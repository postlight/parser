import { EXTRANEOUS_LINK_HINTS_RE } from '../constants';

export function scoreExtraneousLinks(href: string) {
  // If the URL itself contains extraneous values, give a penalty.
  if (EXTRANEOUS_LINK_HINTS_RE.test(href)) {
    return -25;
  }

  return 0;
}
