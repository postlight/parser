import assert from 'assert'
import cheerio from 'cheerio'

import HTML from '../fixtures/html'
import { assertClean } from './test-helpers'

import { cleanHOnes } from './index'

describe('cleanHOnes($)', () => {
  it("removes H1s if there are less than 3 of them", () => {
    let $ = cheerio.load(HTML.removeTwoHOnes.before)

    let result = cleanHOnes($('*').first(), $)
    assertClean(result.html(), HTML.removeTwoHOnes.after)
  })

  it("converts H1s to H2s if there are 3 or more of them", () => {
    let $ = cheerio.load(HTML.convertThreeHOnes.before)

    let result = cleanHOnes($('*').first(), $)
    assertClean(result.html(), HTML.convertThreeHOnes.after)
  })

})




