import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

// import HTML from './fixtures/html'

import extractBestNode from './extract-best-node'

describe('extractBestNode($, flags)', () => {
  it("scores the dom nodes and returns the best option", () => {
    const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8')
    const opts = {
                    stripUnlikelyCandidates: true,
                    weightNodes: true,
                 }

    let $ = cheerio.load(html)

    const bestNode = extractBestNode($, opts)
    // console.log(bestNode.html())

    // assert.equal($(bestNode).text().length, 3652)
  })
})
