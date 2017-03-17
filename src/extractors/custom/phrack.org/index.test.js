import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('PhrackOrgExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://phrack.org/issues/49/14.html';
      const html =
        fs.readFileSync('./fixtures/phrack.org/1489766674042.html');
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
    // in ./src/extractors/custom/phrack.org/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, '.:: Smashing The Stack For Fun And Profit ::.');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/phrack.org/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Aleph1');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/phrack.org/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '1996-11-08T07:11:00.000Z');
    });

    // it('returns the dek', async () => {
    // // To pass this test, fill out the dek selector
    // // in ./src/extractors/custom/phrack.org/index.js.
    //   const { dek } = await result;
    //
    // // Update these values with the expected values from
    // // the article.
    //   assert.equal(dek, '');
    // });

    // it('returns the lead_image_url', async () => {
    // // To pass this test, fill out the lead_image_url selector
    // // in ./src/extractors/custom/phrack.org/index.js.
    //   const { lead_image_url } = await result;
    //
    // // Update these values with the expected values from
    // // the article.
    //   assert.equal(lead_image_url, '');
    // });

    // it('returns the pages_rendered', async () => {
    // // To pass this test, fill out the pages_rendered selector
    // // in ./src/extractors/custom/phrack.org/index.js.
    //   const { pages_rendered } = await result;
    //
    // // Update these values with the expected values from
    // // the article.
    //   assert.equal(pages_rendered, '2');
    // });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/phrack.org/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, '.oO Phrack 49 Oo. Volume Seven, Issue Forty-Nine File 14 of 16 BugTraq,');
    });
  });
});
