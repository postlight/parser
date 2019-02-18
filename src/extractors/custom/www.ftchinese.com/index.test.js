import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwFtchineseComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'http://www.ftchinese.com/story/001081496';
      const html = fs.readFileSync(
        './fixtures/www.ftchinese.com/1550454222229.html'
      );
      result = Mercury.parse(url, html, { fallback: false });
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
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `英国认为华为风险可控`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        author,
        '英国《金融时报》 迪米 华盛顿 ， 戴维•邦德 慕尼黑报道'
      );
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2018-01-02T07:17:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `http://i.ftimg.net/picture/3/000082493_piclink.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.ftchinese.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first1 = excerptContent(
        $('*')
          .first()
          .text(),
        1
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first1,
        '英国政府得出结论认为，它能够缓解在5G网络中使用华为(Huawei)设备的风险。这个结论沉重打击了美国说服盟国把华为挡在高速电信系统门外的努力。两位知情人士将这一尚未公开的结论告诉英国《金融时报》，称英国国家网络安全中心(National'
      );
    });
  });
});
