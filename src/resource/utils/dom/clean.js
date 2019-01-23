import { TAGS_TO_REMOVE } from './constants';

function isComment(index, node) {
  return node.type === 'comment';
}

function cleanComments($) {
  $.root()
    .find('*')
    .contents()
    .filter(isComment)
    .remove();

  return $;
}

export default function clean($) {
  $(TAGS_TO_REMOVE).remove();

  $ = cleanComments($);
  return $;
}
