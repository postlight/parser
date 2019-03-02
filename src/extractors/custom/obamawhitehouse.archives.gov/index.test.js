import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('ObamawhitehouseArchivesGovExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://obamawhitehouse.archives.gov/blog/2017/01/17/obama-administration-digital-transition-moving-forward';
      const html = fs.readFileSync(
        './fixtures/obamawhitehouse.archives.gov/1485905445365.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
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
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'The Obama Administration Digital Transition: Moving Forward'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Kori Schulman');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2017-01-17T23:08:47.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek
          .split(/\s/)
          .slice(0, 4)
          .join(' '),
        "Summary: Here's the latest"
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/digitaltransition.jpeg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/obamawhitehouse.archives.gov/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'Over the past eight years, the President, the First Lady, and the Obama'
      );
    });
  });

  describe('wh.gov speeches', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://obamawhitehouse.archives.gov/the-press-office/2015/04/11/weekly-address-tuition-free-community-college';
      const html = fs.readFileSync(
        './fixtures/obamawhitehouse.archives.gov/1490209983872.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('includes this youtube video', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      assert.equal($('iframe[src*="youtube"]').length, 1);
    });
  });

  describe('gets more failing blogs', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://obamawhitehouse.archives.gov/the-press-office/2016/12/24/weekly-address-merry-christmas-president-and-first-lady';
      const html = fs.readFileSync(
        './fixtures/obamawhitehouse.archives.gov/1490227791307.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('gets the words and video', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'In this week’s address, the President and the First Lady wished all Americans'
      );
      assert.equal($('iframe[src*="youtube"]').length, 1);
    });
  });

  describe('handles this previously empty post', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://obamawhitehouse.archives.gov/blog/2011/09/10/serve-and-remember';
      const html = fs.readFileSync(
        './fixtures/obamawhitehouse.archives.gov/1490375478954.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('gets the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      assert.equal(
        first13,
        'September 11th has been designated as a National Day of Service and Remembrance.'
      );
    });
  });
});
