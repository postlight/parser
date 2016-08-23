import cheerio from 'cheerio'

import CONSTANTS from './constants'

const GenericContentExtractor = {
  flags: {}
  // Entry point for parsing html
  parse(html, flags={}) {
    let $ = cheerio.load(html)
    if (flags) {
      this.flags = flags
    } else {
      this.flags = {
        "strip_unlikely_candidates": True,
        "weight_nodes": True,
        "clean_conditionally": True,
      }
    }
    this.extract($)
  },

  extract($) {
    `Extract the content for this resource - initially, pass in our
    most restrictive flags which will return the highest quality
    content. On each failure, retry with slightly more lax flags.

    :param return_type: string. If "node", should return the content
    as an LXML node rather than as an HTML string.

    Flags:
    strip_unlikely_candidates: Remove any elements that match
    non-article-like criteria first.(Like, does this element
      have a classname of "comment")

    weight_nodes: Modify an elements score based on whether it has
    certain classNames or IDs. Examples: Subtract if a node has
    a className of 'comment', Add if a node has an ID of
    'entry-content'.

    clean_conditionally: Clean the node to return of some
    superfluous content. Things like forms, ads, etc.
    `
    const extraction_flags = [
      'strip_unlikely_candidates',
      'weight_nodes',
      'clean_conditionally'
    ]

    // Cascade through our extraction-specific flags in an ordered fashion,
    // turning them off as we try to extract content.
    {/* node = this.extractCleanNode( */}
    {/*   this.extractBestNode(), */}
    {/*   flags.cleanConditionally) */}
    console.log('hi')
  },

  extractBestNode($) {
    `   Using a variety of scoring techniques, extract the content most
        likely to be article text.

        If strip_unlikely_candidates is True, remove any elements that
        match certain criteria first. (Like, does this element have a
        classname of "comment")

        If weight_nodes is True, use classNames and IDs to determine the
        worthiness of nodes.

        Returns an lxml node.
   `

    // deep clone the node so we can get back to our initial parsed state
    // if needed
    // TODO: Performance improvements here? Deepcopy is known to be slow.
    // Can we avoid this somehow?
    {/* root = deepcopy(self.resource) */}
    {/*  */}
    {/* if self.flags['strip_unlikely_candidates']: */}
    {/*     self._strip_unlikely_candidates(root) */}
    {/*  */}
    {/* self._convert_to_paragraphs(root) */}
    {/* self._score_content(root, weight_nodes=self.flags['weight_nodes']) */}
    {/*  */}
    {/* # print structure(root) */}
    {/*  */}
    {/* top_candidate = self._find_top_candidate(root) */}
    {/*  */}
    {/* return top_candidate */}

  }
}

//
//         if not self.node_is_sufficient(node):
//             # We didn't succeed on first pass, one by one disable our
//             # extraction flags and try again.
//             for flag in extraction_flags:
//                 self.flags[flag] = False
//                 clean_conditionally = self.flags.get(
//                                           'clean_conditionally',
//                                           False
//                                       )
//                 node = self.extract_clean_node(
//                            self._extract_best_node(),
//                            clean_conditionally=clean_conditionally
//                        )
//
//                 # If we found a good node, break out of the flag loop.
//                 if self.node_is_sufficient(node):
//                     break
//
//         # Once we got here, either we're at our last-resort node, or
//         # we broke early. Make sure we at least have -something- before we
//         # move forward.
//         if node is None:
//             return None
//
//         # Remove our scoring information from our content
//         if 'score' in node.attrib:
//             del node.attrib['score']
//         for scored_node in node.xpath('./#<{(|[@score]'):
//             del scored_node.attrib['score']
//
//         if return_type == "html":
//             return normalize_spaces(node_to_html(node))
//         else:
//             return node
//
//     def node_is_sufficient(self, node):
//         """Given a node, determine if it is article-like enough to return."""
//         return (isinstance(node, lxml.html.HtmlElement) and
//                 len(inner_text(node)) >= 100)
//
//
//     def _extract_best_node(self):
//         """ Using a variety of scoring techniques, extract the content most
//             likely to be article text.
//
//             If strip_unlikely_candidates is True, remove any elements that
//             match certain criteria first. (Like, does this element have a
//             classname of "comment")
//
//             If weight_nodes is True, use classNames and IDs to determine the
//             worthiness of nodes.
//
//             Returns an lxml node.
//         """
//
//         # deep clone the node so we can get back to our initial parsed state
//         # if needed
//         # TODO: Performance improvements here? Deepcopy is known to be slow.
//         # Can we avoid this somehow?
//         root = deepcopy(self.resource)
//
//         if self.flags['strip_unlikely_candidates']:
//             self._strip_unlikely_candidates(root)
//
//         self._convert_to_paragraphs(root)
//         self._score_content(root, weight_nodes=self.flags['weight_nodes'])
//
//         # print structure(root)
//
//         top_candidate = self._find_top_candidate(root)
//
//         return top_candidate
//
//     def get_weight(self, node):
//         """ Get the score of a node based on its className and id. """
//         score = 0
//
//         if node.get('id'):
//             if constants.NEGATIVE_SCORE_RE.search(node.get('id')):
//                 score -= 25
//             if constants.POSITIVE_SCORE_RE.search(node.get('id')):
//                 score += 25
//
//         if node.get('class'):
//             # Only score classes on negative/positive if the ID didn't match.
//             if score == 0:
//                 if constants.NEGATIVE_SCORE_RE.search(node.get('class')):
//                     score -= 25
//                 if constants.POSITIVE_SCORE_RE.search(node.get('class')):
//                     score += 25
//
//             # Try to keep photos if we can.
//             if constants.PHOTO_HINTS_RE.search(node.get('class')):
//                 score += 10
//
//             # Bonus for entry-content-asset, which is explicitly denoted to be
//             # more valuable to Readability in the publisher guidelines.
//             if 'entry-content-asset' in node.get('class'):
//                 score += 25
//
//         return score
//
//
//     # The removal is implemented as a blacklist and whitelist, this test finds
//     # blacklisted elements that aren't whitelisted. We do this all in one
//     # expression-both because it's only one pass, and because this skips the
//     # serialization for whitelisted nodes.
//     candidates_blacklist = '|'.join(constants.UNLIKELY_CANDIDATES_BLACKLIST)
//     candidates_whitelist = '|'.join(constants.UNLIKELY_CANDIDATES_WHITELIST)
//
//     # Note: Regular expressions appear to be about 3 times as fast as looping
//     # over each key and matching with contains().
//     #
//     # TODO: Consider mapping all classnames and ids to hashes and using set
//     # intersections for performance.
//     candidates_xpath = (
//         './#<{(|['
//             'not(self::a) and '
//             're:test(concat(@id, " ", @class), "%s", "i") and '
//             'not( re:test(concat(@id, " ", @class), "%s", "i"))'
//         ']'
//     ) % (candidates_blacklist, candidates_whitelist)
//     def _strip_unlikely_candidates(self, doc):
//         """ Loop through the provided document and remove any non-link nodes
//             that are unlikely candidates for article content.
//
//             Links are ignored because there are very often links to content
//             that are identified as non-body-content, but may be inside
//             article-like content.
//
//             :param doc: an LXML doc to strip nodes from
//             :return node: The node itself (even though the conversion happens
//                           by-reference)
//         """
//         unlikely_candidates = doc.xpath(self.candidates_xpath,
//                                         namespaces=RE_NAMESPACE)
//
//         for node in unlikely_candidates:
//             node.drop_tree()
//
//         return doc
//
//     def _convert_to_paragraphs(self, doc):
//         """ Loop through the provided doc, and convert any p-like elements to
//             actual paragraph tags.
//
//             Things fitting this criteria:
//             * Multiple consecutive <br /> tags.
//             * <div /> tags without block level elements inside of them
//             * <span /> tags who are not children of <p /> or <div /> tags.
//
//             :param doc: An LXML node to search through.
//             :return an LXML node of the element, cleaned up.
//                     (By-reference mutation, though. Returned just for convenience.)
//         """
//
//         # Convert every doubled-<br /> to a paragraph tag.
//         self._brs_to_paragraphs(doc)
//
//         # Convert every shallow <div /> to a paragraph tag. Ignore divs that
//         # contain other block level elements.
//         inner_block_tags = './/' + ' or .//'.join(constants.DIV_TO_P_BLOCK_TAGS)
//         shallow_divs = doc.xpath('.//div[not(%s)]' % inner_block_tags)
//
//         for div in shallow_divs:
//             div.tag = 'p'
//
//         # Convert every span tag who has no ancestor p or div tag within their
//         # family tree to a P as well.
//         p_like_spans = doc.xpath('.//span[not(ancestor::p or ancestor::div)]')
//         for span in p_like_spans:
//             span.tag = 'p'
//
//         # If, after all of this, we have no P tags at all, we are probably
//         # dealing with some very ugly content that is separated by single BR
//         # tags. Convert them individually to P tags.
//         if int(doc.xpath('count(//p)')) == 0:
//             self._brs_to_paragraphs(doc, min_consecutive=1)
//
//         # Remove font and center tags, which are ugly and annoying
//         for fonttag in doc.xpath('.//font | .//center'):
//             fonttag.drop_tag()
//
//
//         ### DO WE EVEN NEED THIS?? -Chris ###
//
//         # # Due to the way the paras are inserted, the first paragraph does not
//         # # get captured. Since this first para can contain all sorts of random
//         # # junk (links, drop caps, images) it's not easy to regex our way to
//         # # victory so we do it via dom. - Karl G
//         # try:
//         #     first = node.xpath('.//p[@class = "rdb_br"][position() = 1]')[0]
//         # except IndexError:
//         #     pass
//         # else:
//         #     parent  = first.getparent()
//         #     breaker = None
//         #     if parent is None:
//         #         parent = node
//         #     para = E.P({'class':'rdb_br firstp'})
//         #     has_predecessors = False
//         #     for sibling in first.itersiblings(preceding = True):
//         #         has_predecessors = True
//         #         if sibling.tag in ['p', 'div']:
//         #             breaker = sibling
//         #             break
//         #         para.insert(0,sibling)
//         #
//         #     if (not has_predecessors and parent.text is not None and
//         #         parent.text.strip() != ""):
//         #         para.text = parent.text
//         #         parent.text = ''
//         #     else:
//         #         para.text = (para.text or '') + (parent.tail or '')
//         #
//         #     parent.tail = ''
//         #     if breaker is None:
//         #         parent.insert(0,para)
//         #     else:
//         #         parent.insert(parent.index(breaker)+1,para)
//
//         return doc
//
//     def _brs_to_paragraphs(self, doc, min_consecutive=2):
//         """ Given an LXML document, convert consecutive <br /> tags into
//             <p /> tags instead.
//
//             :param doc: An LXML document to convert within.
//             :param min_consecutive: Integer, the minimum number of consecutive
//                  <br /> tags that must exist for them to be converted to <p />
//                  tags. Must be at least 1.
//
//             A word to the wise: This is deceptively tricky, as break tags
//             don't behave like normal XML should. Make sure you test
//             thoroughly if you make any changes to this code.
//         """
//         brs = doc.xpath('.//br')
//
//         # Loop through all of our break tags, looking for consecutive
//         # <br />s with no content in between them. If found, replace them
//         # with a single P tag.
//         for br in brs:
//             # Generate a list of all the breaks in a row, with no text in
//             # between them.
//             joined_brs = []
//             cur_br = br
//             while True:
//                 joined_brs.append(cur_br)
//
//                 if cur_br.tail:
//                     break
//
//                 next = cur_br.getnext()
//                 next_is_br = next is not None and next.tag.lower() == 'br'
//
//                 if next_is_br:
//                     cur_br = next
//                 else:
//                     break
//
//             if len(joined_brs) < min_consecutive:
//                 continue
//
//             last_br = joined_brs[-1]
//
//             # Now loop through following siblings, until we hit a block
//             # tag or the end, and append them to this P if they are not a
//             # block tag that is not a BR.
//             self._paragraphize(last_br)
//
//             # Drop every break that we no longer need because of the P.
//             # The first BR has been turned into a P tag.
//             for joined_br in joined_brs:
//                 if joined_br is not last_br:
//                     joined_br.drop_tag()
//
//         # If we had any new p tags that are already inside a P tag, resolve
//         # those by paragraphizing them, which will append their block level
//         # contents.
//         for fix_count in xrange(1000):
//             # Find the first p that contains another p, and paragraphize it.
//             # We do this in a loop because we're modifying the dom as we go.
//             try:
//                 parent_p = doc.xpath('//p[./p][1]')[0]
//                 self._paragraphize(parent_p)
//             except IndexError:
//                 break
//         else:
//             # We exhausted our loop, which means we've looped too many times
//             # such that it's unreasonable. Log a warning.
//             logger.warning("Bailing on p parent fix due to crazy "
//                             "looping for url %s" % self.resource.url)
//
//     def _paragraphize(self, node):
//         """ Given a node, turn it into a P if it is not already a P, and
//             make sure it conforms to the constraints of a P tag (I.E. does
//             not contain any other block tags.)
//
//             If the node is a <br />, it treats the following inline siblings
//             as if they were its children.
//
//             :param node: The node to paragraphize
//         """
//         is_br = (node.tag.lower() == 'br')
//
//         if is_br and node.tail:
//             node.text = node.tail
//             node.tail = None
//
//         node.tag = 'p'
//
//         if is_br:
//             sibling = node.getnext()
//             while True:
//                 if (sibling is None or (
//                     sibling.tag in constants.BLOCK_LEVEL_TAGS and
//                     sibling.tag != 'br'
//                     )):
//                     break
//
//                 next_sibling = sibling.getnext()
//                 node.append(sibling)
//                 sibling = next_sibling
//
//         else:
//             children = node.getchildren()
//             i = 0
//             il = len(children)
//             # Ghetto looping so we have access to the iterator afterward
//             while i < il:
//                 child = children[i]
//                 if (child is None or
//                     (child.tag in constants.BLOCK_LEVEL_TAGS and
//                      child.tag != 'br')
//                    ):
//                     break
//                 i = i+1
//
//             # This means we encountered a block level tag within our P,
//             # so we should pop the rest down to siblings.
//             if i < il:
//                 for j in xrange(i, il):
//                     node.addnext(children[j])
//
//
//     ### --- SCORING --- ###
//
//     def _get_score(self, node, weight_nodes=True):
//         """Get a node's score. If weight_nodes is true, weight classes when
//            getting the score as well.
//
//         """
//         score = node.get('score')
//         if score is None:
//             score = self._score_node(node)
//             if weight_nodes:
//                 score += self.get_weight(node)
//             parent = node.getparent()
//             if parent is not None:
//                 self._set_score(parent, self._get_score(parent) + .25 * score)
//         else:
//             score = float(score)
//         return score
//
//     def _set_score(self, node, val):
//         """Set the score of a node to val"""
//         return node.set('score', str(val))
//
//     def _add_score(self, node, val, weight_nodes=True):
//         return self._set_score(node, self._get_score(node, weight_nodes) + val)
//
//     def _score_content(self, doc, weight_nodes=True):
//         """score content. Parents get the full value of their children's
//          content score, grandparents half
//         """
//
//         # First, look for special hNews based selectors and give them a big
//         # boost, if they exist
//         for selector in constants.HNEWS_CONTENT_SELECTORS:
//             # Not self.resource.extract_by_selector because our doc is a copy
//             # of the resource doc.
//             nodes = extract_by_selector(doc, selector,
//                                             AttribMap(doc))
//             for node in nodes:
//                 self._add_score(node, 80)
//
//         paras = doc.xpath('.//p | .//pre')
//
//         # If we don't have any paragraphs at all, we can't score based on
//         # paragraphs, so return without modifying anything else.
//         if len(paras) == 0:
//             return doc
//
//         for para in paras:
//             # Don't score invalid tags
//             if not isinstance(para.tag, basestring):
//                 continue
//
//             # The raw score for this paragraph, before we add any parent/child
//             # scores.
//             raw_score = self._score_node(para)
//             self._set_score(para, self._get_score(para, weight_nodes))
//
//             parent = para.getparent()
//             if parent is not None:
//                 if parent.tag == 'span':
//                     parent.tag = 'div'
//
//                 # Add the individual content score to the parent node
//                 self._add_score(parent, raw_score, weight_nodes=weight_nodes)
//
//                 grandparent = parent.getparent()
//                 if grandparent is not None:
//                     if grandparent.tag == 'span':
//                         grandparent.tag = 'div'
//
//                     # Add half of the individual content score to the
//                     # grandparent
//                     gp_score = raw_score / 2.0
//                     self._add_score(grandparent, gp_score, weight_nodes=weight_nodes)
//
//         return doc
//
//
//     def _score_node(self, node):
//         """Score an individual node. Has some smarts for paragraphs, otherwise
//            just scores based on tag currently.
//
//         """
//         score = 0
//
//         if node.tag in ['p', 'li', 'span', 'pre']:
//             score += self._score_paragraph(node)
//         if node.tag in ['div']:
//             score += 5
//         elif node.tag in ['pre', 'td', 'blockquote', 'ol', 'ul', 'dl']:
//             score += 3
//         elif node.tag in ['address', 'form']:
//             score -= 3
//         elif node.tag in ['th']:
//             score -= 5
//
//         return score
//
//     def _score_paragraph(self, node):
//         """Score a paragraph using various methods. Things like number of
//            commas, etc. Higher is better.
//
//         """
//
//         # Start with a point for the paragraph itself as a base.
//         score = 1
//         text = inner_text(node)
//         text_len = len(text)
//
//         if text_len == 0:
//             if node.getparent() is not None and len(node.getchildren()) == 0:
//                 node.drop_tree()
//             return 0
//
//         # If this paragraph is less than 25 characters, don't count it.
//         if text_len < 25:
//             return 0
//
//         # Add points for any commas within this paragraph
//         score += text.count(',')
//
//         # For every 50 characters in this paragraph, add another point. Up
//         # to 3 points.
//         chunk_count = (text_len / 50)
//         if chunk_count > 0:
//             length_bonus = 0
//             if node.tag in ('pre', 'p'):
//                 length_bonus += chunk_count - 2
//             else:
//                 length_bonus += chunk_count - 1.25
//             score += min(max(length_bonus, 0), 3)
//
//         # Articles can end with short paragraphs when people are being clever
//         # but they can also end with short paragraphs setting up lists of junk
//         # that we strip. This negative tweaks junk setup paragraphs just below
//         # the cutoff threshold.
//         if text.endswith(':'):
//             score -= 1
//
//         return score
//
//     ### ------- TOP CANDIDATE EXTRACTION ------ ###
//
//     def _find_top_candidate(self, root):
//         # After we've calculated scores, loop through all of the possible
//         # candidate nodes we found and find the one with the highest score.
//         top_candidate = None
//         top_candidate_score = 0
//         # Note: ./#<{(| is faster than ./#<{(|[@score], believe it or not.
//         for candidate in root.xpath('./#<{(|'):
//
//             if candidate.tag in constants.NON_TOP_CANDIDATE_TAGS:
//                 continue
//
//             candidate_score = self._get_score(candidate)
//             if top_candidate is None or candidate_score > top_candidate_score:
//                 top_candidate = candidate
//                 top_candidate_score = self._get_score(top_candidate)
//
//
//         # If we still have no candidate, just use the body
//         if top_candidate is None or len(inner_text(top_candidate)) < 250:
//             to_ret = root.find('body')
//             if to_ret is None:
//                 to_ret = root.xpath('.')[0]
//         elif top_candidate.getparent() is not None:
//             # Now that we have a top_candidate, look through the siblings of
//             # it to see if any of them are decently scored. If they are, they
//             # may be split parts of the content (Like two divs, a preamble and
//             # a body.) Example:
//             # http://articles.latimes.com/2009/oct/14/business/fi-bigtvs14
//             to_ret = E.DIV()
//             sibling_score_threshold = max(10, top_candidate_score * 0.2)
//             for child in top_candidate.getparent().iterchildren():
//                 if not isinstance(child.tag, basestring):
//                     continue
//
//                 if self._get_score(child):
//                     append = False
//
//                     if child == top_candidate:
//                         to_ret.append(child)
//                         continue
//
//                     density = link_density(child)
//                     content_bonus = 0
//
//                     # If the sibling has a very low link density, give a small
//                     # bonus.
//                     if density < 0.05:
//                         content_bonus += 20
//
//                     # If it's high, give it a penalty
//                     if density >= 0.5:
//                         content_bonus -= 20
//
//                     # If sibling nodes and top candidates have the exact same
//                     # className, give a bonus
//                     if child.get('class', False) == top_candidate.get('class'):
//                         content_bonus += top_candidate_score * 0.2
//
//                     sibling_score = self._get_score(child) + content_bonus
//                     if sibling_score >= sibling_score_threshold:
//                         append = True
//                     elif child.tag == 'p':
//                         child_content = child.text_content()
//                         child_content_len = len(child_content)
//
//                         if child_content_len > 80 and density < 0.25:
//                             append = True
//                         elif (child_content_len <= 80 and density == 0 and
//                               has_sentence_end(child_content)):
//                             append = True
//
//                     if append:
//                         to_ret.append(child)
//         else:
//             to_ret = top_candidate
//
//         return to_ret
//
//     def extract_clean_node(self, article, clean_conditionally=False):
//         """ Clean our article content, returning a new, cleaned node. """
//         doc = deepcopy(article)
//
//         # Rewrite the tag name to div if it's a top level node like body or
//         # html to avoid later complications with multiple body tags.
//         if doc.tag in ['html','body']:
//             doc.tag = 'div'
//
//         for img in doc.xpath('.//img'):
//             try:
//                 img_height = int(img.attrib.get('height', 20))
//                 img_width  = int(img.attrib.get('width', 20))
//                 if img_height < 10 or img_width < 10:
//                     # Remove images that explicitly have very small heights or
//                     # widths, because they are most likely shims or icons,
//                     # which aren't very useful for reading.
//                     img.drop_tree()
//                 elif 'height' in img.attrib:
//                     # Don't ever specify a height on images, so that we can
//                     # scale with respect to width without screwing up the
//                     # aspect ratio.
//                     del img.attrib['height']
//             except:
//                 pass
//
//         # Drop certain tags like <title>, etc
//         # This is -mostly- for cleanliness, not security. The lxml Cleaner
//         # method in Resource does most of the security stuff for us.
//         for tag in doc.xpath('.//' + ' | .//'.join(constants.STRIP_OUTPUT_TAGS)):
//             tag.drop_tree()
//
//         # Drop spacer images
//         spacer_path = './/img[re:test(@src, "trans|transparent|spacer|blank", "i")]'
//         for tag in doc.xpath(spacer_path, namespaces={'re': constants.RE_NS}):
//             tag.drop_tree()
//
//         # H1 tags are typically the article title, which should be extracted
//         # by the title extractor instead. If there's less than 3 of them (<3),
//         # strip them. Otherwise, turn 'em into H2s.
//         hOnes = doc.xpath('.//h1')
//         if len(hOnes) < 3:
//             for e in hOnes:
//                 e.drop_tree()
//         else:
//             for e in hOnes:
//                 e.tag = 'h2'
//
//         headers = doc.xpath('.//h2 | .//h3 | .//h4 | .//h5 | .//h6')
//         for header in headers:
//             drop_header = False
//
//             # Remove any headers that are before any p tags in the
//             # document. This probably means that it was part of the title, a
//             # subtitle or something else extraneous like a datestamp or byline,
//             # all of which should be handled by other metadata handling.
//             no_previous_ps = int(header.xpath("count(preceding::p[1])")) == 0
//             if no_previous_ps:
//                 similar_header_count = int(doc.xpath('count(.//%s)' % header.tag))
//                 if similar_header_count < 3:
//                     drop_header = True
//
//             # Remove any headers that match the title exactly.
//             if inner_text(header) == self.title:
//                 drop_header = True
//
//             # If this header has a negative weight, it's probably junk.
//             # Get rid of it.
//             if self.get_weight(header) < 0:
//                 drop_header = True
//
//             if drop_header:
//                 try:
//                     header.drop_tree()
//                 except AssertionError:
//                     # No parent exists for this node, so just blank it out.
//                     header.text = ''
//
//         for tag in doc.xpath('./#<{(|[@style or @align]'):
//             try:
//                 del tag.attrib['style']
//             except KeyError:
//                 pass
//             try:
//                 del tag.attrib['align']
//             except KeyError:
//                 pass
//
//         for para in doc.xpath('.//p'):
//             # We have a blank tag
//             if (len(inner_text(para)) < 3 and
//                 len(para.xpath('.//img')) == 0 and
//                 len(para.xpath('.//iframe')) == 0):
//                 para.drop_tree()
//
//         if clean_conditionally:
//             # We used to clean UL's and OL's here, but it was leading to
//             # too many in-article lists being removed. Consider a better
//             # way to detect menus particularly and remove them.
//             self._clean_conditionally(doc, ['ul', 'ol', 'table', 'div'])
//
//         return doc
//
//     def _clean_conditionally(self, doc, tags):
//         """Given a doc, clean it of some superfluous content specified by
//            tags. Things like forms, ads, etc.
//
//            Tags is an array of tag name's to search through. (like div, form,
//            etc)
//
//            Return this same doc.
//         """
//         for node in doc.xpath('.//' + ' | .//'.join(tags)):
//
//             node_is_list = node.tag in ('ul', 'ol')
//
//             weight = self._get_score(node)
//             if node.getparent() is None:
//                 continue
//             if weight < 0:
//                 node.drop_tree()
//             else:
//                 node_content = inner_text(node)
//                 if node_content.count(',') < 10:
//                     remove_node   = False
//                     p_count      = int(node.xpath('count(.//p)'))
//                     img_count    = int(node.xpath('count(.//img)'))
//                     input_count  = int(node.xpath('count(.//input)'))
//                     script_count = int(node.xpath('count(.//script)'))
//                     density      = link_density(node)
//                     content_length = len(inner_text(node))
//
//                     # Looks like a form, too many inputs.
//                     if input_count > (p_count / 3):
//                         remove_node = True
//
//                     # Content is too short, and there are no images, so
//                     # this is probably junk content.
//                     elif content_length < 25 and img_count == 0:
//                         remove_node = True
//
//                     # Too high of link density, is probably a menu or
//                     # something similar.
//                     elif (weight < 25 and
//                           density > 0.2 and
//                           content_length > 75):
//                         remove_node = True
//
//                     # Too high of a link density, despite the score being
//                     # high.
//                     elif weight >= 25 and density > 0.5:
//                         remove_node = True
//                         # Don't remove the node if it's a list and the
//                         # previous sibling starts with a colon though. That
//                         # means it's probably content.
//                         if node_is_list:
//                             previous_sibling = node.getprevious()
//                             if (previous_sibling is not None and
//                                 inner_text(previous_sibling)[-1:] == ':'):
//                                 remove_node = False
//
//                     # Too many script tags, not enough content.
//                     elif script_count > 0 and len(node_content) < 150:
//                         remove_node = True
//
//                     # Explicitly save entry-content-asset tags, which are
//                     # noted as valuable in the Publisher guidelines. For now
//                     # this works everywhere. We may want to consider making
//                     # this less of a sure-thing later.
//                     if 'entry-content-asset' in node.get('class', ''):
//                         remove_node = False
//
//                     if remove_node:
//                         node.drop_tree()
//         return doc

export default GenericContentExtractor
