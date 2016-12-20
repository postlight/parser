import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwMiamiheraldComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.miamiherald.com/news/local/environment/article121880138.html';
      const html =
        fs.readFileSync('./fixtures/www.miamiherald.com/1482250149641.html');
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
    // in ./src/extractors/custom/www.miamiherald.com/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'Winter in Miami feeling a lot like summer in Miami');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.miamiherald.com/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Jenny Staletovich');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.miamiherald.com/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2016-12-20T11:46:00.000Z');
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.miamiherald.com/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://www.miamiherald.com/news/local/environment/w1fzu/picture121880133/ALTERNATES/LANDSCAPE_1140/xmas%20in%20july');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.miamiherald.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'The hottest two years on record for Miami may end with one final');
    });
  });
});
