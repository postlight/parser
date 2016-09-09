import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'
import { assertClean } from 'test-helpers'

import { stripJunkTags } from './index'

describe('stripJunkTags($)', () => {
  it("strips script and other junk tags", () => {
    let $ = cheerio.load(HTML.stripsJunk.before)

    let result = stripJunkTags($('*').first(), $)
    assertClean(result.html(), HTML.stripsJunk.after)
  })

})



