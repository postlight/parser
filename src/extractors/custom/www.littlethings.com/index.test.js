import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('LittleThingsExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.littlethings.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.littlethings.com/diy-pineapple-lamp/';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
    const articleUrl =
      'http://www.littlethings.com/diy-pineapple-lamp/';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Snip The Stems Off Plastic Spoons To Make A Quirky Pineapple Lamp');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
    const articleUrl =
      'http://www.littlethings.com/diy-pineapple-lamp/';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Laura Caseley');
  });


  // it('returns the date_published', async () => {
  //   // To pass this test, fill out the date_published selector
  //   // in ./src/extractors/custom/www.littlethings.com/index.js.
  //   const html =
  //     fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
  //   const articleUrl =
  //     'http://www.littlethings.com/diy-pineapple-lamp/';
  //
  //   const { date_published } =
  //     await Mercury.parse(articleUrl, html, { fallback: false });
  //
  //   // Update these values with the expected values from
  //   // the article.
  //   assert.equal(date_published, '');
  // });


  // it('returns the dek', async () => {
  //   // To pass this test, fill out the dek selector
  //   // in ./src/extractors/custom/www.littlethings.com/index.js.
  //   const html =
  //     fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
  //   const articleUrl =
  //     'http://www.littlethings.com/diy-pineapple-lamp/';
  //
  //   const { dek } =
  //     await Mercury.parse(articleUrl, html, { fallback: false });
  //
  //   // Update these values with the expected values from
  //   // the article.
  //   assert.equal(dek, '');
  // });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
    const articleUrl =
      'http://www.littlethings.com/diy-pineapple-lamp/';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://cdn1.littlethings.com/app/uploads/2016/09/pineapple-b-thumb-1.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.littlethings.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.littlethings.com/1475605036506.html');
    const url =
      'http://www.littlethings.com/diy-pineapple-lamp/';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Every room needs light, and so lamps are pretty much a necessity for');
  });
});
