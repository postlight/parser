import assert from 'assert'
import fs from 'fs'

import { clean } from './content/utils/dom/test-helpers'

import GenericExtractor from './index'

describe('GenericExtractor', () => {
  describe('extract(opts)', () => {
    it("extracts this old LA Times article", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      const {
        title,
        author,
        datePublished,
        dek,
        leadImageUrl,
      } = GenericExtractor.extract(
        { url: "http://latimes.com", html, metaCache: [] }
      )

      assert.equal(author, null)
      assert.equal(
        title,
        'California appears poised to be first to ban power-guzzling big-screen TVs'
      )
      assert.equal(
        datePublished,
        '2009-10-14T04:00:00.000Z'
      )
      assert.equal(dek, null)
      assert.equal(leadImageUrl, 'http://latimesblogs.latimes.com/fb.jpg')
    })

    it("extracts html and returns the article title", () => {
      const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')

      const {
        author,
        title,
        datePublished,
        dek,
        leadImageUrl,
      } = GenericExtractor.extract(
        { url: "http://wired.com", html, metaCache: [] }
      )

      assert.equal(author, 'Eric Adams')
      assert.equal(
        title,
        'Airplane Tires Don’t Explode on Landing Because They Are Pumped!'
      )
      assert.equal(datePublished, null)
      assert.equal(dek, null)
      assert.equal(leadImageUrl, 'https://www.wired.com/wp-content/uploads/2016/08/GettyImages-536814811-1200x630-e1471497753973.jpg')
    })

  })
})

