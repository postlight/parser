import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'
import { assertClean } from './test-helpers'

import { removeEmpty } from './index'

describe('removeEmpty($)', () => {
  it("removes empty P tags", () => {
    let $ = cheerio.load(HTML.removeEmptyP.before)

    let result = removeEmpty($('*').first(), $)
    assertClean(result.html(), HTML.removeEmptyP.after)
  })

  it("does not remove empty DIV tags", () => {
    let $ = cheerio.load(HTML.removeEmptyP.before)

    let result = removeEmpty($('*').first(), $)
    assertClean(result.html(), HTML.removeEmptyP.after)
  })

})

