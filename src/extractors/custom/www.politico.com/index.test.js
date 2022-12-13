import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';
import moment from 'moment-timezone';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

// Rename CustomExtractor
describe('PoliticoExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';
      const html = fs.readFileSync('./fixtures/www.politico.com.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.politico.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Insiders: Trump will sink Pence in VP debate');
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Steven Shepard');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { date_published } = await result;
      const new_date_published = moment(date_published)
        .format()
        .split('T')[0];

      // Update these values with the expected values from
      // the article.
      assert.equal(new_date_published, '2016-10-04');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://static.politico.com/0f/e7/5ee9a89044d1a01f74140bcd5b9e/caucus-vp-preview.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'Tim Kaine isn’t Mike Pence’s only opponent Tuesday night in the only debate'
      );
    });
  });

  describe('test case 2', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.politico.com/news/2022/10/17/student-debt-relief-applications-00062145';
      const html = fs.readFileSync(
        './fixtures/www.politico.com--test-case-2.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.politico.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'Biden’s student debt relief draws 8M+ applications in first two days'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Michael Stratford');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2022-10-17T20:01:26.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.oreilly.co.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        'The president urged Americans to apply for relief through ‘easy, simple and fast’ application process.'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://cf-images.us-east-1.prod.boltdns.net/v1/static/1155968404/79588bde-a378-49fd-b4b4-856d31662aca/35b02a16-1bc3-4d53-b660-4abadfbc14d8/1280x720/match/image.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'More than 8 million Americans have applied for federal student debt relief since'
      );
    });
  });

  describe('test case 3', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.politico.com/newsletters/morning-money/2022/10/11/grim-global-outlook-for-imf-world-bank-meetings-00061134';
      const html = fs.readFileSync(
        './fixtures/www.politico.com--test-case-3.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.politico.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Grim global outlook for IMF-World Bank meetings');
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Kate Davidson');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2022-10-11T12:00:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.oreilly.co.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        'Fed rate hikes have caused spillover effects around the world, prompting a number of central banks to follow suit or intervene to prop up their currency in the face of a stronger U.S. dollar.'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://static.politico.com/da/f5/44342c424c68b675719324b1106b/politico.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.politico.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'Editor’s note: Morning Money is a free version of POLITICO Pro Financial Services'
      );
    });
  });
});
