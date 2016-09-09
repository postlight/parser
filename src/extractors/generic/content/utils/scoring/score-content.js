import { HNEWS_CONTENT_SELECTORS } from '../constants'

import {
  scoreNode,
  setScore,
  getOrInitScore,
  addScore,
} from './index'

import { convertNodeTo } from 'utils/dom'

// score content. Parents get the full value of their children's
// content score, grandparents half
export default function scoreContent($, weightNodes=true) {

  // First, look for special hNews based selectors and give them a big
  // boost, if they exist
  HNEWS_CONTENT_SELECTORS.map(([parentSelector, childSelector]) => {
    $(`${parentSelector} ${childSelector}`).each((index, node) => {
      addScore($(node).parent(parentSelector), $, 80)
    })
  })

  $('p, pre').each((index, node) => {
    // The raw score for this paragraph, before we add any parent/child
    // scores.
    let $node = $(node)
    const rawScore = scoreNode($node)
    $node = setScore($node, $, getOrInitScore($node, $, weightNodes))

    // Add the individual content score to the parent node
    const $parent = $node.parent()
    addScoreTo($parent, $, rawScore, weightNodes)
    if ($parent) {
      // Add half of the individual content score to the
      // grandparent
      addScoreTo($parent.parent(), $, rawScore/2, weightNodes)
    }
  })

  return $
}

function convertSpans($node, $) {
  if ($node.get(0)) {
    const { tagName } = $node.get(0)

    if (tagName === 'span') {
      // convert spans to divs
      convertNodeTo($node, $, 'div')
    }
  }
}

function addScoreTo($node, $, score, weightNodes) {
  if ($node) {
    convertSpans($node, $)
    addScore($node, $, score)
  }
}


    // def _score_content(self, doc, weight_nodes=True):
    //     for selector in constants.HNEWS_CONTENT_SELECTORS:
    //         # Not self.resource.extract_by_selector because our doc is a copy
    //         # of the resource doc.
    //         nodes = extract_by_selector(doc, selector,
    //                                         AttribMap(doc))
    //         for node in nodes:
    //             self._add_score(node, 80)
    //
    //     paras = doc.xpath('.//p | .//pre')
    //
    //     # If we don't have any paragraphs at all, we can't score based on
    //     # paragraphs, so return without modifying anything else.
    //     if len(paras) == 0:
    //         return doc
    //
    //     for para in paras:
    //         # Don't score invalid tags
    //         if not isinstance(para.tag, basestring):
    //             continue
    //
    //         # The raw score for this paragraph, before we add any parent/child
    //         # scores.
    //         raw_score = self._score_node(para)
    //         self._set_score(para, self._get_score(para, weight_nodes))
    //
    //         parent = para.getparent()
    //         if parent is not None:
    //             if parent.tag == 'span':
    //                 parent.tag = 'div'
    //
    //             # Add the individual content score to the parent node
    //             self._add_score(parent, raw_score, weight_nodes=weight_nodes)
    //
    //             grandparent = parent.getparent()
    //             if grandparent is not None:
    //                 if grandparent.tag == 'span':
    //                     grandparent.tag = 'div'
    //
    //                 # Add half of the individual content score to the
    //                 # grandparent
    //                 gp_score = raw_score / 2.0
    //                 self._add_score(grandparent, gp_score, weight_nodes=weight_nodes)
    //
    //     return doc
