import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import { clean } from './utils/dom/test-helpers'

import GenericContentExtractor from './extractor'

describe('GenericContentExtractor', function() {
  this.timeout(1000000)
  describe('extract($, html, opts)', () => {
    it("extracts html and returns the article", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      // Array.from(range(1, 100)).map((i) => {
      //   console.log(i)
      //   clean(GenericContentExtractor.extract(null, html))
      // })
      const result = clean(GenericContentExtractor.extract(
        { $: null, html}
      ))
      // console.log(result)
    })
  })
})


function* range(start = 1, end = 1) {
  while (start <= end) {
    yield start++
  }
}
