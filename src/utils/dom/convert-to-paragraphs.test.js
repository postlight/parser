import assert from 'assert'
import cheerio from 'cheerio'

import { assertClean } from 'test-helpers'
import HTML from './fixtures/html'

import convertToParagraphs from './convert-to-paragraphs'

function assertBeforeAndAfter(key, fn) {
  const $ = cheerio.load(HTML[key].before)
  assertClean(fn($).html(), HTML[key].after)
}

describe('Generic Extractor Utils', () => {
  describe('convertToParagraphs($)', () => {

    it("performs all conversions", () => {
      assertBeforeAndAfter('convertToParagraphs', convertToParagraphs)
    })

  })

})


