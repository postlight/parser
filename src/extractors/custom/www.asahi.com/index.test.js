import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwAsahiComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'http://www.asahi.com/articles/ASM2Q5HKNM2QUCVL02D.html';
      const html = fs.readFileSync(
        './fixtures/www.asahi.com/1551436747155.html'
      );
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
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `メディア芸術祭賞、「チコちゃんに叱られる！」が受賞`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'https://www.facebook.com/asahicom/');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-03-01T04:16:56.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the excerpt', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { excerpt } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        excerpt,
        '文化庁は１日、アート、エンターテインメント、アニメーション、マンガの４部門で優れた作品を顕彰する今年度のメディア芸術祭賞を発表した。エンターテインメント部門の大賞はＮＨＫのテレビ番組「チコちゃんに叱…'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://www.asahicom.jp/articles/images/c_AS20190301001974_comm.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.asahi.com/index.js.
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
        'チコちゃん 文化庁は１日、アート、エンターテインメント、アニメーション、マンガの４部門で優れた作品を顕彰する今年度のメディア芸術祭賞を発表した。エンターテインメント部門の大賞はＮＨＫのテレビ番組「チコちゃんに叱られる！」が受賞した。'
      );
    });
  });
});
