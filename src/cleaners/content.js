import {
  cleanAttributes,
  cleanHeaders,
  cleanHOnes,
  cleanImages,
  cleanTags,
  removeEmpty,
  rewriteTopLevel,
  stripJunkTags,
  makeLinksAbsolute,
} from 'utils/dom';

// Clean our article content, returning a new, cleaned node.
export default function extractCleanNode(
  article,
  {
    $,
    cleanConditionally = true,
    title = '',
    url = '',
  }
) {
  // Rewrite the tag name to div if it's a top level node like body or
  // html to avoid later complications with multiple body tags.
  rewriteTopLevel(article, $);

  // Drop small images and spacer images
  cleanImages(article, $);

  // Drop certain tags like <title>, etc
  // This is -mostly- for cleanliness, not security.
  stripJunkTags(article, $);

  // H1 tags are typically the article title, which should be extracted
  // by the title extractor instead. If there's less than 3 of them (<3),
  // strip them. Otherwise, turn 'em into H2s.
  cleanHOnes(article, $);

  // Clean headers
  cleanHeaders(article, $, title);

  // Make links absolute
  makeLinksAbsolute(article, $, url);

  // Remove style or align attributes
  cleanAttributes(article);

  // We used to clean UL's and OL's here, but it was leading to
  // too many in-article lists being removed. Consider a better
  // way to detect menus particularly and remove them.
  cleanTags(article, $, cleanConditionally);

  // Remove empty paragraph nodes
  removeEmpty(article, $);

  return article;
}
    //     headers = doc.xpath('.//h2 | .//h3 | .//h4 | .//h5 | .//h6')
    //     for header in headers:
    //         drop_header = False
    //
    //         # Remove any headers that are before any p tags in the
    //         # document. This probably means that it was part of the title, a
    //         # subtitle or something else extraneous like a datestamp or byline,
    //         # all of which should be handled by other metadata handling.
    //         no_previous_ps = int(header.xpath("count(preceding::p[1])")) == 0
    //         if no_previous_ps:
    //             similar_header_count = int(doc.xpath('count(.//%s)' % header.tag))
    //             if similar_header_count < 3:
    //                 drop_header = True
    //
    //         # Remove any headers that match the title exactly.
    //         if inner_text(header) == self.title:
    //             drop_header = True
    //
    //         # If this header has a negative weight, it's probably junk.
    //         # Get rid of it.
    //         if self.get_weight(header) < 0:
    //             drop_header = True
    //
    //         if drop_header:
    //             try:
    //                 header.drop_tree()
    //             except AssertionError:
    //                 # No parent exists for this node, so just blank it out.
    //                 header.text = ''
    //
    //     if clean_conditionally:
    //         # We used to clean UL's and OL's here, but it was leading to
    //         # too many in-article lists being removed. Consider a better
    //         # way to detect menus particularly and remove them.
    //         self._clean_conditionally(doc, ['ul', 'ol', 'table', 'div'])
    //
    //     return doc
