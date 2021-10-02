import { STRIP_OUTPUT_TAGS, KEEP_CLASS } from './constants';

export function stripJunkTags(
  article: cheerio.Cheerio,
  $: cheerio.Root,
  tags: string[] = []
) {
  if (tags.length === 0) {
    tags = STRIP_OUTPUT_TAGS;
  }

  // Remove matching elements, but ignore
  // any element with a class of mercury-parser-keep
  $(tags.join(','), article)
    .not(`.${KEEP_CLASS}`)
    .remove();

  return $;
}
