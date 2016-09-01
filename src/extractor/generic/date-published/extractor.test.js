import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'
import GenericDatePublishedExtractor from './extractor'

describe('GenericDatePublishedExtractor', () => {
  describe('extract($, cachedMeta)', () => {
    it('extracts datePublished from meta tags', () => {
      const $ = cheerio.load(HTML.datePublishedMeta.test)
      const cachedMeta = ["displaydate", "something-else"]
      const result =
        GenericDatePublishedExtractor.extract($, '', cachedMeta)

        assert.equal(
          result.toISOString(),
          HTML.datePublishedMeta.result.toISOString()
        )
    })

    it('extracts datePublished from selectors', () => {
      const $ = cheerio.load(HTML.datePublishedSelectors.test)
      const cachedMeta = []
      const result =
        GenericDatePublishedExtractor.extract($, '', cachedMeta)

        assert.equal(
          result.toISOString(),
          HTML.datePublishedMeta.result.toISOString()
        )
    })

    it('extracts from url formatted /2012/08/01/etc', () => {
      const $ = cheerio.load('<div></div>')
      const cachedMeta = []
      const url = 'https://example.com/2012/08/01/this-is-good'
      const result =
        GenericDatePublishedExtractor.extract($, url, cachedMeta)

        assert.equal(
          result.toISOString(),
          new Date('2012/08/01').toISOString()
        )
    })

    it('extracts from url formatted /2020-01-01', () => {
      const $ = cheerio.load('<div></div>')
      const cachedMeta = []
      const url = 'https://example.com/2020-01-01/this-is-good'
      const result =
        GenericDatePublishedExtractor.extract($, url, cachedMeta)

        assert.equal(
          result.toISOString(),
          new Date('2020-01-01').toISOString()
        )
    })

    it('extracts from url formatted /2020/jan/01', () => {
      const $ = cheerio.load('<div></div>')
      const cachedMeta = []
      const url = 'https://example.com/2020/jan/01/this-is-good'
      const result =
        GenericDatePublishedExtractor.extract($, url, cachedMeta)

        assert.equal(
          result.toISOString(),
          new Date('2020/jan/01').toISOString()
        )
    })

    it('returns null if no date can be found', () => {
      // const $ = cheerio.load(HTML.datePublishedMeta.test)
      // const cachedMeta = ["displaydate", "something-else"]
      // const result =
      //   GenericDatePublishedExtractor.extract($, cachedMeta)

      // assert.equal(result.toISOString(), HTML.datePublishedMeta.result.toISOString())
    })

  })
})


