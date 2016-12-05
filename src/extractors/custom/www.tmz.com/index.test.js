import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwTmzComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'http://www.tmz.com/2016/11/28/prince-wife-estate-will/';
      const html =
        fs.readFileSync('./fixtures/www.tmz.com/1480368537455.html');
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
      // in ./src/extractors/custom/www.tmz.com/index.js.
      const { title } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Prince -- Woman Warns Estate ... Step Aside, I\'m His Wife!');
    });

    it('returns the author', () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.tmz.com/index.js.
      const { author } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'TMZ STAFF');
    });

    it('returns the date_published', () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.tmz.com/index.js.
      const { date_published } = result;

      // Update these values with the expected values from
      // the article.
      // Note: This is actually wrong, but the error is from TMZ's very bad
      // markup. Currently the parser will get it close but not the correct
      // timezone. This could be fixed by better markup)
      assert.equal(date_published, '2016-11-28T11:00:00.000Z');
    });

    // it('returns the dek', () => {
    //   // To pass this test, fill out the dek selector
    //   // in ./src/extractors/custom/www.tmz.com/index.js.
    //   const html =
    //     fs.readFileSync('./fixtures/www.tmz.com/1480368537455.html');
    //   const articleUrl =
    //     'http://www.tmz.com/2016/11/28/prince-wife-estate-will/';
    //
    //   const { dek } =
    //     await Mercury.parse(articleUrl, html, { fallback: false });
    //
    //   // Update these values with the expected values from
    //   // the article.
    //   assert.equal(dek, '');
    // });

    it('returns the lead_image_url', () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.tmz.com/index.js.
      const { lead_image_url } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'http://ll-media.tmz.com/2016/11/28/1128-prince-getty-03-1200x630.jpg');
    });

    it('returns the content', () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.tmz.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Prince was married when he died and wanted all of his money to');
    });
  });
});
