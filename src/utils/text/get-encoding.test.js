import assert from 'assert';

import getEncoding from './get-encoding';

describe('getEncoding(str)', () => {
  it('returns the encoding as a string', () => {
    const contentType = 'text/html; charset=iso-8859-15';
    assert.equal(getEncoding(contentType), 'iso-8859-15');
  });

  it('returns utf-8 as a default if no encoding found', () => {
    const contentType = 'text/html';
    assert.equal(getEncoding(contentType), 'utf-8');
  });
});
