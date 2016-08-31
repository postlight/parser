import { BLOCK_LEVEL_TAGS_RE } from '../constants'

// Given a node, turn it into a P if it is not already a P, and
// make sure it conforms to the constraints of a P tag (I.E. does
// not contain any other block tags.)
//
// If the node is a <br />, it treats the following inline siblings
// as if they were its children.
//
// :param node: The node to paragraphize; this is a raw node
// :param $: The cheerio object to handle dom manipulation
// :param br: Whether or not the passed node is a br

export default function paragraphize(node, $, br=false) {
  if (br) {
    let sibling = node.nextSibling
    let p = $('<p></p>')

    // while the next node is text or not a block level element
    // append it to a new p node
    while (true) {
      if (!sibling || (sibling.tagName && BLOCK_LEVEL_TAGS_RE.test(sibling.tagName))) {
        break
      }

      let nextSibling = sibling.nextSibling
      $(sibling).appendTo(p)
      sibling = nextSibling
    }

    $(node).replaceWith(p)
    $(node).remove()
    return $
  } else {
    // Not currently implemented. May not need to; can leverage
    // cheerio's loader/htmlparser2 to format invalid html
    // (e.g., nested p tags)
    return $
  }
}
