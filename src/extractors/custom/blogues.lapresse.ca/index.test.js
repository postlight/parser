import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('BloguesLapresseCaExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://blogues.lapresse.ca/lnh/2017/01/24/certains-revent-de-matt-duchene-a-ottawa/';
      const html =
        fs.readFileSync('./fixtures/blogues.lapresse.ca/1489425440073.html');
      result =
        Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'Certains rêvent de Matt Duchene à Ottawa');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Mathias Brunet');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2017-01-24T05:00:00.000Z');
    });

    it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      const { dek } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://images.lpcdn.ca/641x427/201603/16/1157747.jpg');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/blogues.lapresse.ca/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Le chroniqueur du quotidien Ottawa Citizen, Ken Warren, par exemple, estime que les');
    });
  });
});
