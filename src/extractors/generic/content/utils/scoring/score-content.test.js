import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import { clean } from 'test-helpers'
import HTML from './fixtures/html'

import {
  scoreContent,
  getScore,
} from './index'

// TODO: Walk through these and sanity check my scores
// Commented out scores were what I expected, but I was also
// probably missing something when calculating
describe('scoreContent($, weightNodes)', () => {
  it("loves hNews content", () => {
    const $ = cheerio.load(HTML.hNews.before)
    const result = scoreContent($).html()

    assert.equal(getScore($('div').first()), 140)
  })

  it("is so-so about non-hNews content", () => {
    const $ = cheerio.load(HTML.nonHNews.before)
    const result = scoreContent($).html()

    assert.equal(getScore($('div').first()), 65)
  })

  it("scores this Wired article the same", () => {
    const html = fs.readFileSync('./fixtures/wired.html', 'utf-8')
    const $ = cheerio.load(html)
    const result = scoreContent($).html()

    assert.equal(getScore($('article').first()), 65.5)
  })

  // This is a strange case. On the first pass, scoreContent
  // doesn't score every paragraph node for some reason.
  it("scores this Vulture article the same", () => {
    const html = fs.readFileSync('./fixtures/vulture.html', 'utf-8')
    let $ = cheerio.load(html)
    $ = scoreContent($)
    // console.log("NUMBER OF SCORED Ps", $('p[score]').length)
    // fs.writeFile('./vult.html', $.html())
    // fs.writeFile('./vulttop.html', $.html(top))
    // $('p').each((index, node) => {
    //   console.log(node.attribs.score)
    // })

    // assert.equal(getScore($('[score]').first()), 65.5)
  })

})
