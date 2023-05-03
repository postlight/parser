import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('PostlightComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://postlight.com/insights/three-ways-to-be-the-thermostat';
      const html = fs.readFileSync('./fixtures/postlight.com.html');
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
      // in ./src/extractors/custom/postlight.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `Three Ways to Be the Thermostat`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/postlight.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Gina Trapani');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/postlight.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2022-10-05T16:00:00.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/postlight.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        'Great leaders set the temperature, especially when stress is high.'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/postlight.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://postlight.com/wp-content/uploads/2022/09/Be-The-Thermostat-1200-1.png?fit=1200%2C675`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/postlight.com/index.js.
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
        'Image: Brian Weaver One of the best pieces of advice I’ve ever received'
      );
    });
  });
});
