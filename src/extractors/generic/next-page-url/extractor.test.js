import assert from 'assert';
import cheerio from 'cheerio';

import GenericNextPageUrlExtractor from './extractor';

const fs = require('fs');

describe('GenericNextPageUrlExtractor', () => {
  it('returns most likely next page url', () => {
    const html = fs.readFileSync('./fixtures/ars.html', 'utf8');
    const $ = cheerio.load(html);
    const url =
      'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
    const next =
      'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/2';

    const nextPage = GenericNextPageUrlExtractor.extract({
      $,
      url,
    });

    assert.equal(nextPage, next);
  });

  it('returns null if there is no likely next page', () => {
    const html = '<div><p>HI</p></div>';
    const $ = cheerio.load(html);
    const url = 'http://example.com/foo/bar';

    const nextPage = GenericNextPageUrlExtractor.extract({
      $,
      url,
    });

    assert.equal(nextPage, null);
  });
});
