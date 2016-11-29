import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwLinkedinComExtractor', () => {
  it('is selected properly', () => {
    // This test should be passing by default.
    // It sanity checks that the correct parser
    // is being selected for URLs from this domain
    const url =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.linkedin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.linkedin.com/1480368940900.html');
    const articleUrl =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Using Dogs to Overcome Shyness');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.linkedin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.linkedin.com/1480368940900.html');
    const articleUrl =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'Bruce Kasanoff');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.linkedin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.linkedin.com/1480368940900.html');
    const articleUrl =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-10-28T13:46:56.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.linkedin.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.linkedin.com/1480368940900.html');
    const articleUrl =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAhDAAAAJDY3MDE4MDUwLTU0YjctNDRiYS1iOTc5LWFkNzVlZTYwZjI5OQ.jpg');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.linkedin.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.linkedin.com/1480368940900.html');
    const url =
      'https://www.linkedin.com/pulse/using-dogs-overcome-shyness-bruce-kasanoff';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'With rare exceptions, I am not the life of the party. I lean');
  });
});
