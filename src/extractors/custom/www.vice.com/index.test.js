import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwViceComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.vice.com/en_us/article/mby8eb/tidying-up-with-marie-kondo-is-inadvertently-about-womens-invisible-labor';
      const html =
        fs.readFileSync('./fixtures/www.vice.com/1547244019397.html');
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
    // in ./src/extractors/custom/www.vice.com/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, '\'Tidying Up with Marie Kondo\' Is Inadvertently About Women\'s Invisible Labor');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.vice.com/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Nicole Clark');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.vice.com/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2019-01-10T22:56:14.000Z');
    });

    it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.vice.com/index.js.
      const { dek } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(dek, 'In the new Netflix show, couples learn how to tackle household tasks by \'tidying\' together, a process that reveals just how gendered our domestic expectations are.');
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.vice.com/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'https://video-images.vice.com/articles/5c37b64d6663940007b4ad3c/lede/1547155022354-marie-kondo.jpeg?crop=1xw:0.8438xh;0xw,0.1231xh&resize=1200:*');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.vice.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'I have always been good at organizing. I excessively purge and sort, immersing');
    });
  });
});
