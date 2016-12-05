import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('MediumExtractor', () => {
  describe('initial test case', () => {
    let result
    let url
    beforeAll(async () => {
      url =
        'https://medium.com/the-wtf-economy/wtf-whats-the-future-e52ab9515573#.ilwrgwsks';
      const html =
        fs.readFileSync('./fixtures/medium.com/1477523363921.html');
      result =
        await Mercury.parse(url, html, { fallback: false });
    })

    it('is selected properly', () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/medium.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = result

      assert.equal(title, 'WTF? What’s The Future?');
    });

    it('returns the author', async () => {
      const { author } = result

      assert.equal(author, 'Tim O\'Reilly');
    });

    it('returns the date_published', async () => {
      const { date_published } = result

      assert.equal(date_published, '2016-10-19T14:24:20.323Z');
    });

    it('returns the dek', async () => {
      const { dek } = result

      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/medium.com/index.js.
      const { lead_image_url } = result

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'https://cdn-images-1.medium.com/max/1200/1*3Gzaug9mRc8vvx1cuQWkog.png');
    });

    it('returns the content', async () => {
      const { content } = result

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // testing that youtube video transform is working
      assert.equal(/IAoy3ia2ivI/.test(content), true);

      assert.equal(first13, 'Video of WTF? My talk at the White House Frontiers ConferenceLast Thursday, I');
    });
  });
});
