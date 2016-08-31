import { withinComment } from '../../utils/dom'
// Given a a list of selectors find content that may
// be extractable from the document. This is for flat
// meta-information, like author, title, date published, etc.
export default function extractFromSelectors(
  $,
  selectors,
  maxChildren=1,
  textOnly=true
) {
  for (const selector of selectors) {
    const nodes = $(selector)

    // If we didn't get exactly one of this selector, this may be
    // a list of articles or comments. Skip it.
    if (nodes.length === 1) {
      const node = nodes[0]

      // If it has a number of children, it's more likely a container
      // element. Skip it.
      if ($(node).children().length > maxChildren) {
        continue
      }
      // If it looks to be within a comment, skip it.
      if (withinComment(node, $)) {
        continue
      }

      let content
      if (textOnly) {
        content = $(node).text()
      } else {
        content = $(node).html()
      }

      if (content) {
        return content
      }
    }
  }

  return null
}
// def extract_from_selectors(self, node_type, selectors, use_re=False,
//                            max_children=1, text_only=True):
//     for selector in selectors:
//         if type(selector) == str:
//             if use_re:
//                 nodes = self.resource.redocxp(selector)
//             else:
//                 nodes = self.resource.docxp(selector)
//         else:
//             nodes = self.resource.extract_by_selector(selector)
//
//         if len(nodes) == 1:
//             # If it looks to be within a comment, skip it.
//             if dom.within_comment(node):
//                 continue
//
//             if text_only:
//                 inner_content = dom.inner_text(node)
//             else:
//                 inner_content = dom.inner_html(node)
//
//             clean_value = self._clean(node_type, inner_content)
//             if clean_value:
//                 return clean_value
//
//     return None
