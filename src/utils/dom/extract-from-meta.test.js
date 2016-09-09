import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/extract-from-selectors'
import { extractFromMeta } from './index'

describe('extractFromMeta($, metaNames, cachedNames, cleanTags)', () => {
  it('extracts an arbitrary meta tag by name', () => {
    const $ = cheerio.load(HTML.metaFoo.test)
    const result = extractFromMeta(
      $, ['foo', 'baz'], ['foo', 'bat']
    )

    assert.equal(result, HTML.metaFoo.result)
  })

  it('returns nothing if a meta name is duplicated', () => {
    const $ = cheerio.load(HTML.metaDupes.test)
    const result = extractFromMeta(
      $, ['foo', 'baz'], ['foo', 'bat']
    )

    assert.equal(result, HTML.metaDupes.result)
  })

  it('ignores duplicate meta names with empty values', () => {
    const $ = cheerio.load(HTML.metaEmptyDupes.test)
    const result = extractFromMeta(
      $, ['foo', 'baz'], ['foo', 'bat']
    )

    assert.equal(result, HTML.metaEmptyDupes.result)
  })

  it('accepts custom attributes', () => {
    const $ = cheerio.load(HTML.custom.test)
    const metaNames = [['foo', 'property', 'content']]
    const cachedNames = ['foo']
    const result = extractFromMeta(
      $, metaNames, cachedNames
    )

    assert.equal(result, HTML.custom.result)
  })
})


