import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('AkibapcWatchImpressCoJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://akiba-pc.watch.impress.co.jp/docs/news/news/1170990.html';
      const html = fs.readFileSync(
        './fixtures/akiba-pc.watch.impress.co.jp/1550926285156.html'
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
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `CORSAIRのサーマルグリス「TM30」が発売`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'AKIBA PC Hotline!編集部');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-02-23T03:05:00.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        '低粘度と非毒性をウリとするサーマルグリス。店頭価格は税抜き982円（税込1,060円）。'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://akiba-pc.watch.impress.co.jp/img/ah/list/1170/990/a30tm1.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/akiba-pc.watch.impress.co.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        2
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '低粘度と非毒性をウリとするサーマルグリス。店頭価格は税抜き982円（税込1,060円）。 低粘度の酸化亜鉛を採用することで塗布面の細かな溝まで塗ることが出来る。また、低い熱抵抗によって優れた冷却性能も実現、乾燥やひび割れにも耐性があるという。'
      );
    });
  });
});
