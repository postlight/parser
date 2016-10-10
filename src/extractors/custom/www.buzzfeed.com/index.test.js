import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('BuzzfeedExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.buzzfeed.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.buzzfeed.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
    const articleUrl =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'People Are Calling Out This Edited Picture Of Demi Lovato For Body-Shaming Her');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.buzzfeed.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
    const articleUrl =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Ikran Dahir');
  });


  // it('returns the date_published', async () => {
  //   // To pass this test, fill out the date_published selector
  //   // in ./src/extractors/custom/www.buzzfeed.com/index.js.
  //   const html =
  //     fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
  //   const articleUrl =
  //     'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';
  //
  //   const { date_published } =
  //     await Mercury.parse(articleUrl, html, { fallback: false });
  //
  //   // Update these values with the expected values from
  //   // the article.
  //   // assert.equal(date_published, 'hi');
  // });


  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.buzzfeed.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
    const articleUrl =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'Lovato said: "Is that how my boobs should look?"..');
  });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.buzzfeed.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
    const articleUrl =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://img.buzzfeed.com/buzzfeed-static/static/2016-10/3/12/social_promotion/buzzfeed-prod-fastlane01/facebook-social-promotion-17757-1475512210-1.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.buzzfeed.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.buzzfeed.com/1475531975121.html');
    const url =
      'https://www.buzzfeed.com/ikrd/people-are-calling-out-this-edited-picture-of-demi-lovato-fo';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'A few months ago, Vladimir Serbanescu, a 17-year-old artist from Romania, drew this');
  });
});
