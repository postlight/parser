import {
  stripUnlikelyCandidates,
  convertToParagraphs,
} from 'utils/dom';

import {
  scoreContent,
  findTopCandidate,
} from './scoring';

// Using a variety of scoring techniques, extract the content most
// likely to be article text.
//
// If strip_unlikely_candidates is True, remove any elements that
// match certain criteria first. (Like, does this element have a
// classname of "comment")
//
// If weight_nodes is True, use classNames and IDs to determine the
// worthiness of nodes.
//
// Returns a cheerio object $
export default function extractBestNode($, opts) {
  // clone the node so we can get back to our
  // initial parsed state if needed
  // TODO Do I need this? – AP
  // let $root = $.root().clone()


  if (opts.stripUnlikelyCandidates) {
    $ = stripUnlikelyCandidates($);
  }

  $ = convertToParagraphs($);
  $ = scoreContent($, opts.weightNodes);
  const $topCandidate = findTopCandidate($);

  return $topCandidate;
}
