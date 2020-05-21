import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwDieselsweetiesComExtractor', () => {
  it('initial test case', async () => {
    const html = fs.readFileSync(
      './fixtures/www.dieselsweeties.com/1590022175253.html'
    );
    const uri = 'https://www.dieselsweeties.com/ics/1017/';

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

    assert.equal(title, 'Four Masks');
    assert.equal(author, '@rstevens');
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.dieselsweeties.com/strips666/ds1017.png'
    );

    const $ = cheerio.load(content || '');
    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(first13, '');
    assert.equal($('img').length, 1);
  });
});
