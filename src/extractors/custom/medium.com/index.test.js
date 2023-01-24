import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContentRange } from 'utils/text';

const fs = require('fs');

describe('extract medium article - the wtf economy', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://medium.com/the-wtf-economy/wtf-whats-the-future-e52ab9515573#.ilwrgwsks';
      const html = fs.readFileSync('./fixtures/medium.com--future.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/medium.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;

      assert.equal(title, 'WTF? What’s The Future?');
    });

    it('returns the author', async () => {
      const { author } = await result;

      assert.equal(author, "Tim O'Reilly");
    });

    it('returns the date_published', async () => {
      const { date_published } = await result;

      assert.equal(date_published, '2016-10-19T14:30:56.529Z');
    });

    it('returns the dek', async () => {
      const { dek } = await result;

      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/medium.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://miro.medium.com/max/540/1*3Gzaug9mRc8vvx1cuQWkog.png'
      );
    });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');
      const text = $.text();

      const slice1 = excerptContentRange(text, 0, 13);
      assert.equal(
        slice1,
        'Last Thursday, I had the honor to be one of the warmup acts'
      );

      const slice2 = excerptContentRange(text, -37, -28);
      assert.equal(slice2, 'Can we hand off a better world to our');
    });
  });

  describe('extract medium article - the mtg color wheel', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://humanparts.medium.com/the-mtg-color-wheel-c9700a7cf36d';
      const html = fs.readFileSync('./fixtures/medium.com--mtg.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');
      const text = $.text();

      const slice1 = excerptContentRange(text, 18, 18 + 12);
      assert.equal(
        slice1,
        'Magic: The Gathering is a fantasy card game by Richard Garfield, Ph.D.'
      );

      const slice2 = excerptContentRange(text, -16);
      assert.equal(
        slice2,
        'What sorts of things will I say? What sorts of things are likely to land flat?'
      );
    });
  });
});
