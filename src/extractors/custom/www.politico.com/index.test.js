import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('PoliticoExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.politico.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.politico.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.politico.com/1475617690069.html');
    const articleUrl =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Insiders: Trump will sink Pence in VP debate');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.politico.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.politico.com/1475617690069.html');
    const articleUrl =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Steven Shepard');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.politico.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.politico.com/1475617690069.html');
    const articleUrl =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-04T09:07:00.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.politico.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.politico.com/1475617690069.html');
    const articleUrl =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://static.politico.com/0f/e7/5ee9a89044d1a01f74140bcd5b9e/caucus-vp-preview.jpg');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.politico.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.politico.com/1475617690069.html');
    const url =
      'http://www.politico.com/story/2016/10/who-will-win-the-vp-debate-229079?lo=ut_a1';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Tim Kaine isn’t Mike Pence’s only opponent Tuesday night in the only debate');
  });
});
