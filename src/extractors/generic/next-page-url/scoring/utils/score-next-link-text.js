import { NEXT_LINK_TEXT_RE } from '../constants';

export default function scoreNextLinkText(linkData) {
  // Things like "next", ">>", etc.
  if (NEXT_LINK_TEXT_RE.test(linkData)) {
    return 50;
  }

  return 0;
}
