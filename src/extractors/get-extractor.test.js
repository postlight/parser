import assert from 'assert';
import cheerio from 'cheerio';

import getExtractor from './get-extractor';

describe('getExtractor(url)', () => {
  it('returns GenericExtractor if no custom extractor is found', () => {
    const extractor = getExtractor(
      'http://example.com',
      null,
      cheerio.load('<div />')
    );

    assert.equal(extractor.domain, '*');
  });

  it('returns a custom extractor if found', () => {
    const extractor = getExtractor('https://nymag.com');

    assert.equal(extractor.domain, 'nymag.com');
  });

  it('falls back to base domain if subdomain not found', () => {
    const extractor = getExtractor('https://googleblog.blogspot.com');

    assert.equal(extractor.domain, 'blogspot.com');
  });

  it('falls back to base domain if subdomain not found', () => {
    const extractor = getExtractor('https://en.m.wikipedia.org');

    assert.equal(extractor.domain, 'wikipedia.org');
  });

  it('returns a custom extractor based on detectors', () => {
    const html = '<head><meta name="al:ios:app_name" value="Medium" /></head>';

    const $ = cheerio.load(html);
    const extractor = getExtractor('http://foo.com', null, $);

    assert.equal(extractor.domain, 'medium.com');
  });
});
