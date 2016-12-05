import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('LittleThingsExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'http://www.littlethings.com/diy-pineapple-lamp/';
      const html =
        fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.littlethings.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
      const { title } = result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'Snip The Stems Off Plastic Spoons To Make A Quirky Pineapple Lamp');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
      const { author } = result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Laura Caseley');
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
      const { lead_image_url } = result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://cdn1.littlethings.com/app/uploads/2016/09/pineapple-b-thumb-1.jpg');
    });

    it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
      assert.equal(first13, 'Every room needs light, and so lamps are pretty much a necessity for');
    });
  });
});
