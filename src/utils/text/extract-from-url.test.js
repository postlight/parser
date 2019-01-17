import assert from 'assert';

import extractFromUrl from './extract-from-url';

describe('extractFromUrl(url)', () => {
  it('extracts datePublished from url', () => {
    const url = 'https://example.com/2012/08/01/this-is-good';
    const regexList = [new RegExp('/(20\\d{2}/\\d{2}/\\d{2})/')];
    const result = extractFromUrl(url, regexList);

    assert.equal(result, '2012/08/01');
  });

  it('returns null if nothing found', () => {
    const url = 'https://example.com/this-is-good';
    const regexList = [new RegExp('/(20\\d{2}/\\d{2}/\\d{2})/')];
    const result = extractFromUrl(url, regexList);

    assert.equal(result, null);
  });
});
