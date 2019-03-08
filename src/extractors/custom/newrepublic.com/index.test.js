import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('NewrepublicComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://newrepublic.com/article/138859/fantastic-beasts-nice-place-visit';
      const html = fs.readFileSync(
        './fixtures/newrepublic.com/1480434805231.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });
    it('is selected properly', async () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('article returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Fantastic Beasts: A Nice Place to Visit');
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Will Leitch');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-11-18T05:00:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        "The glorious world-building in the first Harry Potter spin-off isn't enough to keep viewers coming back."
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://images.newrepublic.com/29020c1e6b108813cf65b54487ad2b5a65aa6079.jpeg?w=1109&h=577&crop=faces&fit=crop&fm=jpg'
      );
    });

    it('article returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
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
        'The eight Harry Potter films, which stretched out over nearly a decade, had'
      );
    });
  });

  describe('minutes', async () => {
    let result;
    let url;
    beforeAll(async () => {
      url =
        'https://newrepublic.com/minutes/139022/maybe-donald-trumps-twitter-account-just-smoke-screen';
      const html = fs.readFileSync(
        './fixtures/newrepublic.com/1480446502259.html'
      );
      result = await Mercury.parse(url, { html, fallback: false });
    });

    it('minute returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        'Maybe Donald Trump’s Twitter account is more than just a smoke screen.'
      );
    });

    it('article returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Alex Shephard');
    });

    it('minute returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/newrepublic.com/index.js.
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
        'It’s been one of the most persistent narratives of the last year: Whenever'
      );
    });
  });
});
