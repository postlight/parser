import {
  KEEP_SELECTORS,
  KEEP_CLASS,
} from './constants';

export default function markToKeep(article, $, tags = []) {
  if (tags.length === 0) {
    tags = KEEP_SELECTORS;
  }

  $(tags.join(','), article).addClass(KEEP_CLASS);

  return $;
}
