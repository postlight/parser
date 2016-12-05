import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwCnnComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'http://www.cnn.com/2016/11/29/politics/donald-trump-transition-presidency/index.html';
      const html =
        fs.readFileSync('./fixtures/www.cnn.com/1480458253239.html');
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
      // in ./src/extractors/custom/www.cnn.com/index.js.
      const { title } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Why Donald Trump won\'t change');
    });

    it('returns the author', () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.cnn.com/index.js.
      const { author } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Stephen Collinson, CNN');
    });

    it('returns the date_published', () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.cnn.com/index.js.
      const { date_published } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-11-29T10:39:35.000Z');
    });

    it('returns the lead_image_url', () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.cnn.com/index.js.
      const { lead_image_url } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'http://i2.cdn.cnn.com/cnnnext/dam/assets/161128072443-01-trump-1128-super-tease.jpg');
    });

    it('returns the content', () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.cnn.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, '(CNN)Winning the presidency didn\'t change Donald Trump -- and it\'s increasingly clear that');
      assert.equal($('.media__video--thumbnail').length, 1);
    });
  });
});
