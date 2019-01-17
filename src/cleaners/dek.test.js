import assert from 'assert';
import cheerio from 'cheerio';

import cleanDek from './dek';

describe('cleanDek(dekString, { $ })', () => {
  it('returns null if the dek is < 5 chars', () => {
    const $ = cheerio.load('<div></div>');
    assert.equal(cleanDek('Hi', { $ }), null);
  });

  it('returns null if the dek is > 1000 chars', () => {
    const $ = cheerio.load('<div></div>');
    const longDek =
      // generate a string that is 1,280 chars
      [0, 1, 2, 3, 4, 5, 6].reduce(acc => {
        acc += acc;
        return acc;
      }, '0123456789');
    assert.equal(cleanDek(longDek, { $ }), null);
  });

  it('strip html tags from the dek', () => {
    const $ = cheerio.load('<div></div>');
    const dek = 'This is a <em>very</em> important dek.';

    assert.equal(cleanDek(dek, { $ }), 'This is a very important dek.');
  });

  it('returns null if dek contains plain text link', () => {
    const $ = cheerio.load('<div></div>');
    const dek = 'This has this link http://example.com/foo/bar';

    assert.equal(cleanDek(dek, { $ }), null);
  });

  it('returns a normal dek as is', () => {
    const $ = cheerio.load('<div></div>');
    const dek = 'This is the dek';

    assert.equal(cleanDek(dek, { $ }), dek);
  });

  it('cleans extra whitespace', () => {
    const $ = cheerio.load('<div></div>');
    const dek = '    This is the dek   ';

    assert.equal(cleanDek(dek, { $ }), 'This is the dek');
  });

  it('returns null if the dek is the same as the excerpt', () => {
    const $ = cheerio.load('<div></div>');
    const excerpt = 'Hello to all of my friends';
    assert.equal(cleanDek(excerpt, { $, excerpt }), null);
  });
});
