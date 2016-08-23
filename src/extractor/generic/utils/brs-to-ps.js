// ## NOTES:
// Another good candidate for refactoring/optimizing.
// Very imperative code, I don't love it. - AP


//  Given cheerio object, convert consecutive <br /> tags into
//  <p /> tags instead.
//
//  :param $: A cheerio object
//  :param min_consecutive: Integer, the minimum number of consecutive
//       <br /> tags that must exist for them to be converted to <p />
//       tags. Must be at least 1.
//
export default function brsToPs($, minConsecutive=2) {
  let collapsing = false
  $('br').each((index, element) => {
    let nextElement = $(element).next().get(0)

    if (nextElement && nextElement.tagName === 'br') {
      collapsing = true
      $(element).remove()
    } else if (collapsing) {
      collapsing = false
      $(element).replaceWith('<p />')
    }
  })

  return $
}
    // def _brs_to_paragraphs(self, doc, min_consecutive=2):
    //     print "_brs_to_paragraphs: convert consecutive brs to p tags"
    //     brs = doc.xpath('.//br')
    //
    //     # Loop through all of our break tags, looking for consecutive
    //     # <br />s with no content in between them. If found, replace them
    //     # with a single P tag.
    //     for br in brs:
    //         # Generate a list of all the breaks in a row, with no text in
    //         # between them.
    //         joined_brs = []
    //         cur_br = br
    //         while True:
    //             joined_brs.append(cur_br)
    //
    //             if cur_br.tail:
    //                 break
    //
    //             next = cur_br.getnext()
    //             next_is_br = next is not None and next.tag.lower() == 'br'
    //
    //             if next_is_br:
    //                 cur_br = next
    //             else:
    //                 break
    //
    //         if len(joined_brs) < min_consecutive:
    //             continue
    //
    //         last_br = joined_brs[-1]
    //
    //         # Now loop through following siblings, until we hit a block
    //         # tag or the end, and append them to this P if they are not a
    //         # block tag that is not a BR.
    //         self._paragraphize(last_br)
    //
    //         # Drop every break that we no longer need because of the P.
    //         # The first BR has been turned into a P tag.
    //         for joined_br in joined_brs:
    //             if joined_br is not last_br:
    //                 joined_br.drop_tag()
    //
    //     # If we had any new p tags that are already inside a P tag, resolve
    //     # those by paragraphizing them, which will append their block level
    //     # contents.
    //     for fix_count in xrange(1000):
    //         # Find the first p that contains another p, and paragraphize it.
    //         # We do this in a loop because we're modifying the dom as we go.
    //         try:
    //             parent_p = doc.xpath('//p[./p][1]')[0]
    //             self._paragraphize(parent_p)
    //         except IndexError:
    //             break
    //     else:
    //         # We exhausted our loop, which means we've looped too many times
    //         # such that it's unreasonable. Log a warning.
    //         logger.warning("Bailing on p parent fix due to crazy "
    //                         "looping for url %s" % self.resource.url)
