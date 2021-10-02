import URL from 'url';

import { KEEP_SELECTORS, KEEP_CLASS } from './constants';

export function markToKeep(
  article: cheerio.Cheerio,
  $: cheerio.Root,
  url: string,
  tags: string[] = []
) {
  if (tags.length === 0) {
    tags = KEEP_SELECTORS;
  }

  if (url) {
    const { protocol, hostname } = URL.parse(url);
    tags = [...tags, `iframe[src^="${protocol}//${hostname}"]`];
  }

  $(tags.join(','), article).addClass(KEEP_CLASS);

  return $;
}
