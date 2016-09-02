import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import { clean } from './utils/dom/test-helpers'

import GenericContentExtractor from './extractor'

describe('GenericContentExtractor', function() {
  this.timeout(1000000)
  describe('parse(html, opts)', () => {
    it("parses html and returns the article", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      // Array.from(range(1, 100)).map((i) => {
      //   console.log(i)
      //   clean(GenericContentExtractor.parse(null, html))
      // })
      const result = clean(GenericContentExtractor.parse(null, html))
      // console.log(result)
    })
  })
})


function* range(start = 1, end = 1) {
  while (start <= end) {
    yield start++
  }
}
