import assert from 'assert'
import fs from 'fs'

import { clean } from './content/utils/dom/test-helpers'

import GenericExtractor from './index'

describe('GenericExtractor', () => {
  describe('parse(html)', () => {
    it("parses this old LA Times article", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      const {
        title,
        author,
        datePublished,
      } = GenericExtractor.parse("http://latimes.com", html)

      assert.equal(author, null)
      assert.equal(
        title,
        'California appears poised to be first to ban power-guzzling big-screen TVs'
      )
      assert.equal(
        datePublished.toISOString(),
        '2009-10-14T04:00:00.000Z'
      )
    })

    it("parses html and returns the article title", () => {
      const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')

      const {
        author,
        title,
        datePublished,
      } = GenericExtractor.parse("http://wired.com", html)

      assert.equal(author, 'Eric Adams')
      assert.equal(
        title,
        'Airplane Tires Don’t Explode on Landing Because They Are Pumped!'
      )
      assert.equal(
        datePublished,
        null
      )
    })

  })
})

