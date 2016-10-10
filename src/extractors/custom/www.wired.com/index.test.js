import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';

// Rename CustomExtractor
describe('WiredExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.wired.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const articleUrl =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'An Ode to the Rosetta Spacecraft as It Flings Itself Into a Comet');
  });


  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const articleUrl =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Emma Grey Ellis');
  });


  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const articleUrl =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-09-30T07:00:12.000Z');
  });


  it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const articleUrl =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

    const { dek } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(dek, 'Time to break out the tissues, space fans.');
  });


  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const articleUrl =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://www.wired.com/wp-content/uploads/2016/09/Rosetta_impact-1-1200x630.jpg');
  });


  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.wired.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.wired.com/1475256747028.html');
    const url =
      'https://www.wired.com/2016/09/ode-rosetta-spacecraft-going-die-comet/';

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
    assert.equal(first13, 'Today, the European Space Agency’s Rosetta spacecraft will engage its thrusters for one');
  });
});
