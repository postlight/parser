import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwInvestmentexecutiveComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.investmentexecutive.com/news/research-and-markets/imf-dims-outlook-for-2023-global-economy-amid-ukraine-war/';
      const html = fs.readFileSync(
        './fixtures/www.investmentexecutive.com.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
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
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `IMF dims outlook for 2023 global economy amid Ukraine war`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Paul WisemanFatima Hussein, The Associated Press');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2022-10-11T19:11:05.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, "``The worst is yet to come,'' chief economist says");
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://www.investmentexecutive.com/wp-content/uploads/sites/3/2021/01/SB05-Feature-Image-800x600-1.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.investmentexecutive.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'The International Monetary Fund is downgrading its outlook for the world economy for'
      );
    });
  });
});
