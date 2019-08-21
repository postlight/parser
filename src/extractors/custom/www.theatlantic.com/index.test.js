import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';

const fs = require('fs');

// Rename CustomExtractor
describe('AtlanticExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.theatlantic.com/technology/archive/2016/09/why-new-yorkers-got-a-push-alert-about-a-manhunt/500591/';
      const html = fs.readFileSync(
        './fixtures/www.theatlantic.com/1474321707642.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.theatlantic.com/index.js
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('works with a starter story', async () => {
      // To pass this test, begin filling out your
      // selectors in ./src/extractors/custom/www.theatlantic.com/index.js. This test is just
      // a stub; you can add more fields to test as much of
      // your parser as possible.
      const { content, title, author, dek, lead_image_url } = await result;

      const $ = cheerio.load(content);
      const text = $('*')
        .first()
        .text()
        .trim()
        .slice(0, 20);

      assert.equal(
        title,
        'Why New Yorkers Received a Push Alert About a Manhunt'
      );
      assert.equal(author, 'Kaveh Waddell');
      assert.equal(text, 'The city has never b');
      assert.equal(
        dek,
        'The city has never before used the emergency system the way it did Monday morning.'
      );
      assert.equal(
        lead_image_url,
        'https://cdn.theatlantic.com/assets/media/img/mt/2016/09/RTSO9RP/lead_720_405.jpg?mod=1533691849'
      );
    });
  });
});
