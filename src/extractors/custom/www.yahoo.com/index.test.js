import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';

// Rename CustomExtractor
describe('YahooExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.yahoo.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', ((async)) () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const articleUrl =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Clinton Cancels Joint Events with Sanders');
  });


  it('returns the author', ((async)) () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const articleUrl =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Fox Nation');
  });


  it('returns the date_published', ((async)) () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const articleUrl =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-03T04:00:00.000Z');
  });


  it('returns the dek', ((async)) () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const articleUrl =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'The Hillary Clinton campaign has canceled joint appearances with former primary opponent Bernie Sanders after he admitted that');
  });


  it('returns the lead_image_url', ((async)) () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const articleUrl =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://s.yimg.com/uu/api/res/1.2/tE8CoXSgHD15n5p8wUwGJA--/aD0zMDA7dz02MjQ7c209MTthcHBpZD15dGFjaHlvbg--/http://slingstone.zenfs.com/offnetwork/218c3f97f0b7e1598b6dc9fd10126e22');
  });


  it('returns the content', ((async)) () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.yahoo.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.yahoo.com/1475529982399.html');
    const url =
      'https://www.yahoo.com/news/m/1c621104-b0eb-3b4d-9b0a-7bb979f80d7d/ss_clinton-cancels-joint-events.html';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = $('*').first()
                          .text()
                          .trim()
                          .split(/\s+/)
                          .slice(0, 13)
                          .join(' ');

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'The Hillary Clinton campaign has canceled joint appearances with former primary opponent Bernie');
  });
});
