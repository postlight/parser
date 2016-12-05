import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('MoneyCnnComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'http://money.cnn.com/2016/11/29/news/ohare-workers-strike/index.html';
      const html =
        fs.readFileSync('./fixtures/money.cnn.com/1480437611330.html');
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
      // in ./src/extractors/custom/money.cnn.com/index.js.
      const { title } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Hundreds of Chicago O\'Hare airport workers go on strike');
    });

    it('returns the author', () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/money.cnn.com/index.js.
      const { author } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Julia Horowitz');
    });

    it('returns the date_published', () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/money.cnn.com/index.js.
      const { date_published } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-11-29T03:33:08.000Z');
    });

    it('returns the dek', () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/money.cnn.com/index.js.
      const { dek } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, 'Heads up, travelers: Hundreds of workers are striking at Chicago O\'Hare International Airport on Tuesday.');
    });

    it('returns the lead_image_url', () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/money.cnn.com/index.js.
      const { lead_image_url } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'http://i2.cdn.turner.com/money/dam/assets/161118102423-ohare-airport-strike-780x439.jpg');
    });

    it('returns the content', () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/money.cnn.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Janitors, baggage handlers, cabin cleaners and wheelchair attendants are asking for a $15');
    });
  });
});
