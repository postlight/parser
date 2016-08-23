import assert from 'assert'
import cheerio from 'cheerio'

import { clean } from './test-helpers'
import HTML from './fixtures/html'
import {
  brsToPs
} from './index'

describe('Generic Extractor Utils', () => {
  describe('brsToPs(node)', () => {

    it("does nothing when no BRs present", () => {
      const $ = cheerio.load(HTML.positiveId)
      assert.equal(brsToPs($).html(), HTML.positiveId)
    })

    it("does nothing when a single BR is present", () => {
      const $ = cheerio.load(HTML.singleBr.before)
      assert.equal(brsToPs($).html(), HTML.singleBr.after)
    })

    it("converts double BR tags to an empty P tag", () => {
      const $ = cheerio.load(HTML.doubleBrs.before)
      const result = brsToPs($).html()
      assert.equal(clean(result), clean(HTML.doubleBrs.after))
    })

    it("converts several BR tags to an empty P tag", () => {
      const $ = cheerio.load(HTML.severalBrs.before)
      const result = brsToPs($).html()
      assert.equal(clean(result), clean(HTML.severalBrs.after))
    })

    it("converts BR tags in a P tag into a P containing inline children", () => {
      const $ = cheerio.load(HTML.brsInP.before)
      const result = brsToPs($).html()
      // assert.equal(clean(result), clean(HTML.brsInP.after))
    })

  })
})

