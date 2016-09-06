import { TAGS_TO_REMOVE } from './constants'
export default function clean($) {
  $(TAGS_TO_REMOVE).remove()

  $ = cleanComments($)
  return $
}

function isComment(index, node) {
  return node.type === 'comment'
}

function cleanComments($) {
  $.root().find('*').contents().filter(isComment).remove()

  return $
}
