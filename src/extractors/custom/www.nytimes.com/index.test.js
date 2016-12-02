import assert from 'assert';
import fs from 'fs';
import cheerio from 'cheerio';
import URL from 'url';

import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';
import Mercury from 'mercury';

describe('NYTimesExtractor', () => {
  it('is selected properly', () => {
    // To pass this test, rename your extractor in
    // ./src/extractors/custom/www.nytimes.com/index.js
    // (e.g., CustomExtractor => NYTimesExtractor)
    // then add your new extractor to
    // src/extractors/all.js
    const url =
      'http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.nytimes.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const articleUrl =
      'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Ahmad Khan Rahami Is Arrested in Manhattan and New Jersey Bombings');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.nytimes.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const articleUrl =
      'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Marc Santora, William K. Rashbaum, Al Baker and Adam Goldman');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.nytimes.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const articleUrl =
      'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-09-19T11:46:01.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.nytimes.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const articleUrl =
      'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://static01.nyt.com/images/2016/09/20/nyregion/20MANHUNT1/20MANHUNT1-facebookJumbo.jpg');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.nytimes.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.nytimes.com/1474318141888.html');
    const url =
      'http://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'The man believed to be responsible for the explosion in Manhattan on Saturday');
  });

  it('works with a feature story', async () => {
    const html = fs.readFileSync('./fixtures/www.nytimes.com/1474061823854.html');
    const uri = 'http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html';

    const { content, title, author } = await Mercury.parse(uri, html);
    const $ = cheerio.load(content);
    const text = $('*').first()
                       .text()
                       .trim()
                       .slice(0, 20);

    assert.equal(title, 'I, Too, Sing America');
    assert.equal(author, 'The New York Times');
    assert.equal(text, 'T he Smithsonian’s N');
  });
});
