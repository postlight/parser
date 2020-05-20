import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwBluesnewsComExtractor', () => {
  it('initial test case', async () => {
    const html = fs.readFileSync(
      './fixtures/www.bluesnews.com/1590013269981.html'
    );
    const uri = 'https://www.bluesnews.com/s/210788/hardware-reviews';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, {
      html,
    });

    assert.equal(title, 'Hardware Reviews for May 08, 2020, 2:59 pm ET');
    assert.equal(author, null);
    assert.equal(date_published, '2020-05-08T14:59:00.000Z');
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
      'Thanks Neutronbeam. Acer Swift 3 (AMD) Laptop Review- Meet Ryzen 7 4700U -'
    );
  });
});
