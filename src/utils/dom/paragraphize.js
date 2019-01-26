import { BLOCK_LEVEL_TAGS_RE } from './constants';

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

export default function paragraphize(node, $, br = false) {
  const $node = $(node);

  if (br) {
    let sibling = node.nextSibling;
    const p = $('<p></p>');

    // while the next node is text or not a block level element
    // append it to a new p node
    while (
      sibling &&
      !(sibling.tagName && BLOCK_LEVEL_TAGS_RE.test(sibling.tagName))
    ) {
      const { nextSibling } = sibling;
      $(sibling).appendTo(p);
      sibling = nextSibling;
    }

    $node.replaceWith(p);
    $node.remove();
    return $;
  }

  return $;
}
