import assert from 'assert'
import cheerio from 'cheerio'

import { assertBeforeAndAfter } from './test-helpers'
import HTML from '../fixtures/html'
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
      assertBeforeAndAfter('singleBr', brsToPs)
    })

    it("converts double BR tags to an empty P tag", () => {
      assertBeforeAndAfter('doubleBrs', brsToPs)
    })

    it("converts several BR tags to an empty P tag", () => {
      assertBeforeAndAfter('severalBrs', brsToPs)
    })

    it("converts BR tags in a P tag into a P containing inline children", () => {
      assertBeforeAndAfter('brsInP', brsToPs)
    })

  })
})

