import assert from 'assert';
import cheerio from 'cheerio';

import getSupportedMime from './get-supported-mime';

describe('getSupportedMime(str)', () => {
  if (cheerio.browser) return;

  it('returns html mime type', () => {
    const contentType = 'text/html; charset=iso-8859-15';
    assert.equal(getSupportedMime(contentType), 'text/html');
  });

  it('returns html mime type with charset first', () => {
    const contentType = 'charset=utf-8; text/html';
    assert.equal(getSupportedMime(contentType), 'text/html');
  });

  it('returns text plain mime type', () => {
    const contentType = 'text/plain';
    assert.equal(getSupportedMime(contentType), 'text/plain');
  });

  it('unsupported mime type', () => {
    const contentType = 'application/msword';
    assert.equal(getSupportedMime(contentType), false);
  });

});
