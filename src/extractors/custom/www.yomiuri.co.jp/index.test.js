import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwYomiuriCoJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://www.yomiuri.co.jp/sports/soccer/20190411-OYT1T50287/';
      const html = fs.readFileSync(
        './fixtures/www.yomiuri.co.jp/1554993242061.html'
      );
      result = Mercury.parse(url, {
        html,
        fallback: false,
      });
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
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `バルセロナ、マンＵに先勝…ＣＬ準々決勝第１戦`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-04-11T13:22:00.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://www.yomiuri.co.jp/media/2019/04/20190411-OYT1I50076-1.jpg?type=ogp`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.yomiuri.co.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        1
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '先制点が決まり、喜ぶバルセロナのメッシ（左）とスアレス＝ロイター'
      );
    });
  });
});
