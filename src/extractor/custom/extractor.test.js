import assert from 'assert'
import fs from 'fs'
import cheerio from 'cheerio'

import CustomExtractor from './extractor'
import GenericExtractor from '../generic'
import NYMagExtractor from './nymag.com'

describe('CustomExtractor', () => {
  it('extracts based on custom selectors', () => {
    const url = 'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html'
    const html = fs.readFileSync('./src/extractor/custom/nymag.com/fixtures/test.html', 'utf8')
    const $ = cheerio.load(html)

    const {
      title,
      content,
      author,
      datePublished,
      leadImageUrl,
    } = CustomExtractor.extract(NYMagExtractor, url, html, $)

    assert.equal(title, 'Trump Claims He Discussed $25K Donation With Florida Attorney General, But Not Trump University Investigation')
    console.log(leadImageUrl)
  })
})
