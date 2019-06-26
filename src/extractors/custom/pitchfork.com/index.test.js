import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('PitchforkComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://pitchfork.com/reviews/albums/lust-for-youth-lust-for-youth/';
      const html = fs.readFileSync(
        './fixtures/pitchfork.com/1560196240837.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `Lust for Youth: Lust for Youth Album Review`);
    });

    it('returns the author', async () => {
      const { author } = await result;

      assert.equal(author, 'Larry Fitzmaurice');
    });

    it('returns the date_published', async () => {
      const { date_published } = await result;

      assert.equal(date_published.split('T')[0], '2019-06-07');
    });

    it('returns the dek', async () => {
      const { dek } = await result;

      assert.equal(
        dek,
        "Hannes Norrvide's long-running coldwave synth project breaks into the greener pastures of Depeche Mode-style new wave."
      );
    });

    it('returns the lead_image_url', async () => {
      const { lead_image_url } = await result;

      assert.equal(
        lead_image_url,
        `https://media.pitchfork.com/photos/5cefef2693a53659ed1ee6b8/1:1/w_320/LustForYouth_LustForYouth.jpg`
      );
    });

    it('returns the content', async () => {
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
        'Coldwave never cared about you. The minimalistic, machine-driven sound that bubbled up twice'
      );
    });

    it('returns the score', async () => {
      const { score } = await result;

      assert.equal(score, '6.2');
    });
  });
});
