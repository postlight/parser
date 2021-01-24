import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('NewYorkerExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1611473608343.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.newyorker.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'Hacking, Cryptography, and the Countdown to Quantum Computing'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Alex Hutchinson');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published.split('T')[0], '2016-09-26');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://media.newyorker.com/photos/59097a5e8b51cf59fc4239f5/16:9/w_1280,c_limit/Hutchinson-Quantum-Computing.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.newyorker.com/index.js.
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
        'Given the recent ubiquity of cyber-scandals—Colin Powell’s stolen e-mails, Simone Biles’s leaked medical'
      );
    });
  });

  describe('magazine content', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.newyorker.com/magazine/2016/12/05/lessons-from-my-mother';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1611475571383.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns the dek when present', async () => {
      const { dek } = await result;

      assert.equal(
        dek,
        'I had a sense that she was a good teacher, but I had no idea that she was such an influential one, and in the very area I had chosen.'
      );
    });

    it('returns the date for magazine content', async () => {
      const { date_published } = await result;

      assert.equal(date_published.split('T')[0], '2016-11-28');
    });
  });

  describe('article with multiple authors', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.newyorker.com/humor/daily-shouts/teas-you-should-probably-get-rid-of-already';
      const html = fs.readFileSync(
        './fixtures/www.newyorker.com/1557834611707.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns multiple authors', async () => {
      const { author } = await result;

      assert.equal(
        author,
        'Ysabel YatesIllustration by Claire LordonMay 10, 2019'
      );
    });
  });
});
