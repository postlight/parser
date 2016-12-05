import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('MSNExtractor', () => {
  describe('initial test case', () => {
    let result
    let url
    beforeAll(async () => {
      url =
        'http://www.msn.com/en-us/health/wellness/this-is-your-brain-on-sad-movies-plus-5-films-to-cry-to/ar-BBwsPWG?li=BBnb2gg';
      const html =
        fs.readFileSync('./fixtures/www.msn.com/1475506925474.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    })

    it('is selected properly', () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.msn.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.msn.com/index.js.
      const { title } = result

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'This Is Your Brain On Sad Movies; Plus 5 Films To Cry To');
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.msn.com/index.js.
      const { author } = result

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Lizette Borreli');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.msn.com/index.js.
      const { date_published } = result

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published.split('T')[0], '2016-09-21');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.msn.com/index.js.
      const { lead_image_url } = result

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, null);
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.msn.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'The psychological reason why we love to watch sad movies is linked to');
    });
  });
});
