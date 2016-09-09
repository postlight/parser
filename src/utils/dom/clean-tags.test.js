import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'
import { assertClean } from 'test-helpers'

import { cleanTags } from './index'

describe('cleanTags($)', () => {
  it("drops a matching node with a negative score", () => {
    let $ = cheerio.load(HTML.dropNegativeScore.before)

    let result = cleanTags($('*').first(), $)
    assertClean(result.html(), HTML.dropNegativeScore.after)
  })

  it("removes a node with too many inputs", () => {
    let $ = cheerio.load(HTML.removeTooManyInputs.before)

    let result = cleanTags($('*').first(), $)
    $('[score]').each((i, e) => $(e).removeAttr('score'))

    assertClean(result.html(), HTML.removeTooManyInputs.after)
  })

  it("removes a div with no images and very little text", () => {
    let $ = cheerio.load(HTML.removeShortNoImg.before)

    let result = cleanTags($('*').first(), $)
    $('[score]').each((i, e) => $(e).removeAttr('score'))

    assertClean(result.html(), HTML.removeShortNoImg.after)
  })

  it("removes a node with a link density that is too high", () => {
    let $ = cheerio.load(HTML.linkDensityHigh.before)

    let result = cleanTags($('*').first(), $)
    $('[score]').each((i, e) => $(e).removeAttr('score'))

    assertClean(result.html(), HTML.linkDensityHigh.after)
  })

  it("removes a node with a good score but link density > 0.5", () => {
    let $ = cheerio.load(HTML.linkDensityHigh.before)

    let result = cleanTags($('*').first(), $)
    $('[score]').each((i, e) => $(e).removeAttr('score'))

    assertClean(result.html(), HTML.linkDensityHigh.after)
  })

  it("keeps node with a good score but link density > 0.5 if preceding text ends in colon", () => {
    let $ = cheerio.load(HTML.previousEndsInColon.before)

    let result = cleanTags($('*').first(), $)
    assertClean(result.html(), HTML.previousEndsInColon.before)
  })

  it("keeps anything with a class of entry-content-asset", () => {
    let $ = cheerio.load(HTML.cleanEntryContentAsset.before)

    let result = cleanTags($('*').first(), $)
    assertClean(result.html(), HTML.cleanEntryContentAsset.before)
  })


})


