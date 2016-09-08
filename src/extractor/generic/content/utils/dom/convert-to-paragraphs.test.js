import assert from 'assert'
import cheerio from 'cheerio'

import {
  assertBeforeAndAfter,
  assertClean
} from './test-helpers'
import HTML from '../fixtures/html'

import {
  convertToParagraphs
} from './index'

describe('Generic Extractor Utils', () => {
  describe('convertToParagraphs($)', () => {

    it("performs all conversions", () => {
      assertBeforeAndAfter('convertToParagraphs', convertToParagraphs)
    })

  })

})


