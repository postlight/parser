import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('NextwarezComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://nextwarez.com/10-plus-gros-trackers-torrents-monde/';
      const html =
        fs.readFileSync('./fixtures/nextwarez.com/1488394551752.html');
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
    // in ./src/extractors/custom/nextwarez.com/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'Les 10 plus gros trackers torrents internationaux en 2017');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/nextwarez.com/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'NW Team');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/nextwarez.com/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2017-01-08T17:48:24.000Z');
    });

    // it('returns the dek', async () => {
    // // To pass this test, fill out the dek selector
    // // in ./src/extractors/custom/nextwarez.com/index.js.
    //   const { dek } = await result;
    //
    // // Update these values with the expected values from
    // // the article.
    //   assert.equal(dek, '');
    // });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/nextwarez.com/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://nextwarez.com/wp-content/uploads/2015/07/kickasstorrents-disparais-de-google1.jpg');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/nextwarez.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Chaque année, nos confrères de TorrentFreak listent les 10 plus gros trackers torrent.');
    });
  });
});
