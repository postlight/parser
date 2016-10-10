import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('WikiaExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/fandom.wikia.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/fandom.wikia.com/index.js.
    const html =
      fs.readFileSync('./fixtures/fandom.wikia.com/1475595373938.html');
    const articleUrl =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Box Office: It’s Good to Be ‘Peculiar’');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/fandom.wikia.com/index.js.
    const html =
      fs.readFileSync('./fixtures/fandom.wikia.com/1475595373938.html');
    const articleUrl =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Drew Dietsch');
  });


  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/fandom.wikia.com/index.js.
    const html =
      fs.readFileSync('./fixtures/fandom.wikia.com/1475595373938.html');
    const articleUrl =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-03T02:30:57.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/fandom.wikia.com/index.js.
    const html =
      fs.readFileSync('./fixtures/fandom.wikia.com/1475595373938.html');
    const articleUrl =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://fandom.wikia.com/wp-content/uploads/2016/10/box-office-peculiar-feature-hero.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/fandom.wikia.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/fandom.wikia.com/1475595373938.html');
    const url =
      'http://fandom.wikia.com/articles/box-office-good-peculiar';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Tim Burton once again claimed the top spot at the box office. Miss');
  });
});
