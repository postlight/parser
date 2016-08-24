import assert from 'assert'
import cheerio from 'cheerio'

import {
  clean
} from '../dom/test-helpers'
import HTML from './fixtures/html'

import {
  scoreContent,
  getScore
} from './index'

describe('scoreContent($, weightNodes)', () => {
  it("loves hNews content", () => {
    const $ = cheerio.load(HTML.hNews.before)
    const result = scoreContent($).html()

    assert.equal(getScore($('div').first(), $), 99)
  })

  it("is so-so about non-hNews content", () => {
    const $ = cheerio.load(HTML.nonHNews.before)
    const result = scoreContent($).html()

    assert.equal(getScore($('div').first(), $), 38)
  })

})
