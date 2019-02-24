import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('KtaiWatchImpressCoJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://k-tai.watch.impress.co.jp/docs/news/1171272.html';
      const html = fs.readFileSync(
        './fixtures/k-tai.watch.impress.co.jp/1550930074168.html'
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
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `電波法改正案、電波利用料を大幅見直し`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, '太田 亮三');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-02-22T13:25:50.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        '政府は、電波法の改正案を2月12日に閣議決定した。今後、3～4月の国会の総務委員会に提出される予定になっている。'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://k-tai.watch.impress.co.jp/img/ktw/list/1171/272/mic.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/k-tai.watch.impress.co.jp/index.js.
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
        '政府は、電波法の改正案を2月12日に閣議決定した。今後、3～4月の国会の総務委員会に提出される予定になっている。'
      );
    });
  });
});
