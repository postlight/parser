import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwTestedComExtractor', () => {
  it('initial test', async () => {
    const html = fs.readFileSync(
      './fixtures/www.tested.com/1590096599723.html'
    );
    const uri =
      'https://www.tested.com/tech/photography/907317-show-and-tell-instant-film-printer-and-custom-display/';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(
      title,
      'Show and Tell: Instant Film Printer and Custom Display!'
    );
    assert.equal(author, null);
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(lead_image_url, null);

    const $ = cheerio.load(content || '');
    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      'Show and Tell: Instant Film Printer and Custom Display!By Norman Chan on May'
    );
  });
});
