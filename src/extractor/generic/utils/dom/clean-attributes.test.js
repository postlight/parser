import cheerio from 'cheerio'
import assert from 'assert'

import HTML from '../fixtures/html'
import { assertClean } from './test-helpers'

import { cleanAttributes } from './index'

describe('cleanAttributes($)', () => {
  it("removes style attributes from nodes", () => {
    let $ = cheerio.load(HTML.removeStyle.before)

    let result = cleanAttributes($('*').first(), $)
    assertClean(result.html(), HTML.removeStyle.after)
  })

  it("removes align attributes from nodes", () => {
    let $ = cheerio.load(HTML.removeAlign.before)

    let result = cleanAttributes($('*').first(), $)
    assertClean(result.html(), HTML.removeAlign.after)
  })

})
