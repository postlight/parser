import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import extractCleanNode from './extract-clean-node'
import extractBestNode from './extract-best-node'

describe('extractCleanNode(article, $, { cleanConditionally })', () => {
  it("cleans cruft out of a DOM node", () => {
    const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')
    let $ = cheerio.load(html)

    const opts = {
                    stripUnlikelyCandidates: true,
                    weightNodes: true,
                    cleanConditionally: true,
                 }

    const bestNode = extractBestNode($, opts)
    let result = $.html(bestNode)
    // console.log(result)
    // console.log(result.length)
    const cleanNode = extractCleanNode(bestNode, $, opts)
    result = $.html(cleanNode)
    // console.log(result.length)
    // console.log(result)
    // console.log(bestNode.html())

    assert.equal($(bestNode).text().length, 3652)
  })
})

