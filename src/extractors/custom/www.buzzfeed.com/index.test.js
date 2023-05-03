import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

// Rename CustomExtractor
describe('BuzzfeedExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';
      const html = fs.readFileSync('./fixtures/www.buzzfeed.com.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.buzzfeed.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'People Are Calling Out This Edited Picture Of Demi Lovato For Body-Shaming Her'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Ikran Dahir');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-10-03T16:35:39.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://img.buzzfeed.com/buzzfeed-static/static/2016-10/3/14/campaign_images/buzzfeed-prod-fastlane01/people-are-calling-out-this-edited-picture-of-dem-2-28558-1475518666-10_dblbig.jpg'
      );
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.cbssports.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, 'Lovato said: "Is that how my boobs should look?"');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('span')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'A few months ago, Vladimir Serbanescu, a 17-year-old artist from Romania, drew this'
      );
    });
  });

  describe('splash image', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.buzzfeed.com/katiejmbaker/college-trump-supporters-the-new-counterculture?utm_term=.ckb72b58Y#.oxY8ZOWY3';
      const html = fs.readFileSync('./fixtures/www.buzzfeed.com--splash.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns big header images in the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const imgSrc = $('img')
        .first()
        .attr('src');

      assert.equal(
        imgSrc,
        'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg?output-format=jpg&output-quality=auto'
      );
    });

    it('transforms the splash image to a figure and caption', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const imgSrc = $('figure img')
        .first()
        .attr('src');
      const figcaption = $('figure figcaption')
        .first()
        .text();

      // Update these values with the expected values from
      // the article.
      assert.equal(
        imgSrc,
        'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg?output-format=jpg&output-quality=auto'
      );
      assert.equal(
        figcaption,
        '\n                Adam Maida for BuzzFeed News\n              '
      );
    });
  });
});
