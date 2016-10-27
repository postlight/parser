import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

// Rename CustomExtractor
describe('CustomExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.apartmenttherapy.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const articleUrl =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'A Light Filled LA Loft');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const articleUrl =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Apartment Therapy Submissions');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const articleUrl =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-13T21:00:00.000Z');
  });

  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const articleUrl =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, "Name: Ashley Location: Downtown — Los Angeles, California Welcome to our sunny and spacious downtown home located in the in the heart of Downtown LA's Historic Core. Inside you'll find a 1,300 square foot bi-level ground unit with loft (only three of its kind!) that offers an unparalleled, refined industrial, modern aesthetic.");
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const articleUrl =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://atmedia.imgix.net/9332fdca908b1fcc5c9a6891b458820718239950?w=1500&fit=max');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.apartmenttherapy.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.apartmenttherapy.com/1476396697639.html');
    const url =
      'http://www.apartmenttherapy.com/a-light-filled-la-loft-236564';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Name: Ashley Location: Downtown — Los Angeles, California Welcome to our sunny and');
  });
});
