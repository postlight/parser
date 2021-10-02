import { TAGS_TO_REMOVE } from './constants';

function cleanComments($: cheerio.Root) {
  $.root()
    .find('*')
    .contents()
    .filter((_, node) => node.type === 'comment')
    .remove();

  return $;
}

export default function clean($: cheerio.Root) {
  $(TAGS_TO_REMOVE).remove();

  $ = cleanComments($);
  return $;
}
