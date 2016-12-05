import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('BuzzfeedExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';
      const html =
        fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.buzzfeed.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { title } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'People Are Calling Out This Edited Picture Of Demi Lovato For Body-Shaming Her');
    });

    it('returns the author', () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { author } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Ikran Dahir');
    });

    it('returns the lead_image_url', () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      const { lead_image_url } = result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'https://img.buzzfeed.com/buzzfeed-static/static/2016-10/3/12/social_promotion/buzzfeed-prod-fastlane01/facebook-social-promotion-17757-1475512210-1.jpg');
    });

    it('returns the content', () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.buzzfeed.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'A few months ago, Vladimir Serbanescu, a 17-year-old artist from Romania, drew this');
    });
  });

  describe('splash image', () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'https://www.buzzfeed.com/katiejmbaker/college-trump-supporters-the-new-counterculture?utm_term=.ckb72b58Y#.oxY8ZOWY3';
      const html =
        fs.readFileSync('./fixtures/www.buzzfeed.com/1480717502688.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    });
    it('returns big header images in the content', () => {
      const { content } = result;

      const $ = cheerio.load(content || '');

      const imgSrc = $('img').first().attr('src');

      assert.equal(imgSrc, 'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg');
    });

    it('transforms the splash image to a figure and caption', () => {
      const { content } = result;

      const $ = cheerio.load(content || '');

      const imgSrc = $('figure img').first().attr('src');
      const figcaption = $('figure figcaption').first().text();

      // Update these values with the expected values from
      // the article.
      assert.equal(imgSrc, 'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/21/10/enhanced/buzzfeed-prod-fastlane03/longform-original-25748-1479741827-5.jpg');
      assert.equal(figcaption, 'Adam Maida for BuzzFeed News');
    });
  });
});
