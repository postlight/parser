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
    // ./src/extractors/custom/www.broadwayworld.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const articleUrl =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'American Theatre Wing Launches Andrew Lloyd Webber Training Scholarships');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const articleUrl =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'BWW News Desk');
  });


  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const articleUrl =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-13T19:35:00.000Z');
  });


  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const articleUrl =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'The American Theatre Wing announced today that their Andrew Lloyd Webber Initiative has launched its second initiative program, the Training Scholarships, bridging the gap between talent and opportunity and creating a strong pipeline to the professional theatre for promising artists of all backgrounds.');
  });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const articleUrl =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://images.bwwstatic.com/columnpic7/7B5FD766-A644-E386-19DE07017A3AD79C.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.broadwayworld.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.broadwayworld.com/1476392567143.html');
    const url =
      'http://www.broadwayworld.com/article/American-Theatre-Wing-Launches-Andrew-Lloyd-Webber-Training-Scholarships-20161013';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'The American Theatre Wing announced today that their Andrew Lloyd Webber Initiative has');
  });
});
