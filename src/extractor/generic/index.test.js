import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import { clean } from './content/utils/dom/test-helpers'

import GenericExtractor from './index'

describe('GenericExtractor', () => {
  describe('parse(html)', () => {
    it("parses html and returns the article title", () => {
      const html = fs.readFileSync('../fixtures/latimes.html', 'utf-8')

      const { title } = GenericExtractor.parse("http://latimes.com", html)
      assert.equal(title, 'California appears poised to be first to ban power-guzzling big-screen TVs')
    })

    it("parses html and returns the article title", () => {
      const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')

      const { title } = GenericExtractor.parse("http://wired.com", html)
      assert.equal(title, 'Airplane Tires Don’t Explode on Landing Because They Are Pumped!')
    })
  })
})

