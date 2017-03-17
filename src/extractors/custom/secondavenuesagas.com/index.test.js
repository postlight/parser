import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('SecondavenuesagasComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://secondavenuesagas.com/2017/03/05/no-uber-isnt-responsible-declining-weekend-ridership-thoughts/';
      const html =
        fs.readFileSync('./fixtures/secondavenuesagas.com/1489765278605.html');
      result =
        Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'No, Uber isn\'t responsible for declining weekend ridership, and other thoughts');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Benjamin Kabak');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2017-03-06T03:41:47.000Z');
    });

    it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      const { dek } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(dek, 'After years and years of massive growth, something a little bit funny and a little bit predictable happened to New York City’s weekend subway ridership last year: It declined. This is the first year since the Great Recession in late 2008 led to a subsequent dip in ridership in 2009 that weekend trips have gone …');
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://cdn-sas.secondavenuesagas.com/wp-content/uploads/2017/03/Ridership2016.jpg');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/secondavenuesagas.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Subway ridership showed a slight dip in 2016 with the weekends accounting for');
    });
  });
});
