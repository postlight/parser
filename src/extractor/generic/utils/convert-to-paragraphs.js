import { brsToPs } from './index'
import { DIV_TO_P_BLOCK_TAGS } from '../constants'
// Loop through the provided doc, and convert any p-like elements to
// actual paragraph tags.
//
//   Things fitting this criteria:
//   * Multiple consecutive <br /> tags.
//   * <div /> tags without block level elements inside of them
//   * <span /> tags who are not children of <p /> or <div /> tags.
//
//   :param $: A cheerio object to search
//   :return cheerio object with new p elements
//   (By-reference mutation, though. Returned just for convenience.)

export default function convertToParagraphs($) {
  $ = brsToPs($)
  $ = convertDivs($)
  $ = convertSpans($)

  return $
}

function convertDivs($) {
  $('div').each((index, div) => {
    const convertable = $(div).children()
      .not(DIV_TO_P_BLOCK_TAGS).length == 0
    if (convertable) {
      convertNodeToP(div, $)
    }
  })

  return $
}

function convertSpans($) {
  $('span').each((index, span) => {
    const convertable = $(span).parents('p, div').length == 0
    if (convertable) {
      convertNodeToP(span, $)
    }
  })

  return $
}

export function convertNodeToP(node, $) {
  $(node).replaceWith(`<p>${$(node).contents()}</p>`)
  return $
}

    // def _convert_to_paragraphs(self, doc):
    //
    //     # Convert every doubled-<br /> to a paragraph tag.
    //     self._brs_to_paragraphs(doc)
    //
    //     # Convert every shallow <div /> to a paragraph tag. Ignore divs that
    //     # contain other block level elements.
    //     inner_block_tags = './/' + ' or .//'.join(constants.DIV_TO_P_BLOCK_TAGS)
    //     shallow_divs = doc.xpath('.//div[not(%s)]' % inner_block_tags)
    //
    //     for div in shallow_divs:
    //         div.tag = 'p'
    //
    //     # Convert every span tag who has no ancestor p or div tag within their
    //     # family tree to a P as well.
    //     p_like_spans = doc.xpath('.//span[not(ancestor::p or ancestor::div)]')
    //     for span in p_like_spans:
    //         span.tag = 'p'
    //
    //     # If, after all of this, we have no P tags at all, we are probably
    //     # dealing with some very ugly content that is separated by single BR
    //     # tags. Convert them individually to P tags.
    //     if int(doc.xpath('count(//p)')) == 0:
    //         self._brs_to_paragraphs(doc, min_consecutive=1)
    //
    //     # Remove font and center tags, which are ugly and annoying
    //     for fonttag in doc.xpath('.//font | .//center'):
    //         fonttag.drop_tag()
    //
    //
    //     ### DO WE EVEN NEED THIS?? -Chris ###
    //
    //     # # Due to the way the paras are inserted, the first paragraph does not
    //     # # get captured. Since this first para can contain all sorts of random
    //     # # junk (links, drop caps, images) it's not easy to regex our way to
    //     # # victory so we do it via dom. - Karl G
    //     # try:
    //     #     first = node.xpath('.//p[@class = "rdb_br"][position() = 1]')[0]
    //     # except IndexError:
    //     #     pass
    //     # else:
    //     #     parent  = first.getparent()
    //     #     breaker = None
    //     #     if parent is None:
    //     #         parent = node
    //     #     para = E.P({'class':'rdb_br firstp'})
    //     #     has_predecessors = False
    //     #     for sibling in first.itersiblings(preceding = True):
    //     #         has_predecessors = True
    //     #         if sibling.tag in ['p', 'div']:
    //     #             breaker = sibling
    //     #             break
    //     #         para.insert(0,sibling)
    //     #
    //     #     if (not has_predecessors and parent.text is not None and
    //     #         parent.text.strip() != ""):
    //     #         para.text = parent.text
    //     #         parent.text = ''
    //     #     else:
    //     #         para.text = (para.text or '') + (parent.tail or '')
    //     #
    //     #     parent.tail = ''
    //     #     if breaker is None:
    //     #         parent.insert(0,para)
    //     #     else:
    //     #         parent.insert(parent.index(breaker)+1,para)
    //
    //     return doc
