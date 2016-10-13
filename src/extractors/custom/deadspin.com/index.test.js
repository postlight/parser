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
    // ./src/extractors/custom/deadspin.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/deadspin.com/1476389931786.html');
    const articleUrl =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'The Nationals Are Stuck With Danny Espinosa Tonight, Unless They Opt For The Only Thing Worse');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/deadspin.com/1476389931786.html');
    const articleUrl =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Chris Thompson');
  });


  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/deadspin.com/1476389931786.html');
    const articleUrl =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-13T16:34:00.000Z');
  });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/deadspin.com/1476389931786.html');
    const articleUrl =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://i.kinja-img.com/gawker-media/image/upload/s--SUEXWZgf--/c_fill,fl_progressive,g_center,h_450,q_80,w_800/vmeayd7lteyycwzcdlju.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/deadspin.com/1476389931786.html');
    const url =
      'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'Photo credit: Rob Carr/Getty Washington’s Danny Espinosa problem is inextricably linked to its');
  });
});
