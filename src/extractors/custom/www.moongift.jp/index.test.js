import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwMoongiftJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.moongift.jp/2019/04/wasm-module-rust%e3%81%aewebassembly%e3%81%ae%e4%b8%ad%e3%81%a7dom%e3%82%92%e6%89%b1%e3%81%86/';
      const html = fs.readFileSync(
        './fixtures/www.moongift.jp/1554559177617.html'
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
      // in ./src/extractors/custom/www.moongift.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `wasm-module - RustのWebAssemblyの中でDOMを扱う`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.moongift.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.moongift.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2019-04-03T15:00:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.moongift.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        'wasm-module - RustのWebAssemblyの中でDOMを扱うの使い方、日本語情報はMOONGIFTでチェック。個人的にWebAssemblyには強く期待しており、その中でもGoが有力だと感じています。それはGoのWebAssemblyではDOMやJavaScript APIが使えるからです。駆使すればWebアプリケーション全体のコードをGoで書けるのです。これがRustにもないのが残念でした。しかしwasm-moduleが新し...。MOONGIFTはオープンソース・ソフトウェアを毎日紹介'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.moongift.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://s3-ap-northeast-1.amazonaws.com/moongift/attaches/16931/list.?1553229736`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.moongift.jp/index.js.
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
        '個人的にWebAssemblyには強く期待しており、その中でもGoが有力だと感じています。それはGoのWebAssemblyではDOMやJavaScript'
      );
    });
  });
});
