import assert from 'assert'
import cheerio from 'cheerio'

import HTML from '../fixtures/html'
import { assertClean } from './test-helpers'

import { cleanHeaders } from './index'

describe('cleanHeaders(article, $)', () => {
  it("parses html and returns the article", () => {
    let $ = cheerio.load(HTML.cleanFirstHeds.before)

    let result = cleanHeaders($('*').first(), $)
    assertClean(result.html(), HTML.cleanFirstHeds.after)
  })

  it("removes headers when the header text matches the title", () => {
    let $ = cheerio.load(HTML.cleanTitleMatch.before)

    let result = cleanHeaders($('*').first(), $, 'Title Match')
    assertClean(result.html(), HTML.cleanTitleMatch.after)
  })

  it("removes headers with a negative weight", () => {
    let $ = cheerio.load(HTML.dropWithNegativeWeight.before)

    let result = cleanHeaders($('*').first(), $)
    assertClean(result.html(), HTML.dropWithNegativeWeight.after)
  })
})

