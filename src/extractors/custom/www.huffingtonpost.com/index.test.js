import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwHuffingtonpostComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'http://www.huffingtonpost.com/entry/donald-trump-obama_us_583c8f01e4b06539a789ddd4';
      const html =
        fs.readFileSync('./fixtures/www.huffingtonpost.com/1480454076105.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      const { title } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Trump Has Shown Receptiveness To Obama\'s Agenda. Does He Actually Mean It?');
    });

    it('returns the author', () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      const { author } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Sam Stein');
    });

    it('returns the date_published', () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      const { date_published } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-11-28T21:23:00.000Z');
    });

    it('returns the dek', () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      const { dek } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, 'The $1 million question: Can you change the president-elect\'s worldview or is this all for show?');
    });

    it('returns the lead_image_url', () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      const { lead_image_url } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'http://img.huffingtonpost.com/asset/2000_1000/583c90681a00002500cca17a.jpeg');
    });

    it('returns the content', () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.huffingtonpost.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'ASSOCIATED PRESS Donald Trump has had several conversations with President Obama. How much');
    });
  });
});
