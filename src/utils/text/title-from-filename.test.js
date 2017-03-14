import assert from 'assert';

import titleFromFilename from './title-from-filename';

describe('titleFromFilename(url)', () => {
  it('returns the filename', () => {
    const url = 'http://example.com/foo/bar/test.txt';
    assert.equal(titleFromFilename(url), 'test.txt');
  });

  it('returns the filename', () => {
    const url = 'http://example.com/readme.txt';
    assert.equal(titleFromFilename(url), 'readme.txt');
  });

  it('returns nothing', () => {
    const url = 'http://example.com/foo/';
    assert.equal(titleFromFilename(url), '');
  });
});
