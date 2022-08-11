import assert from 'assert';

import pageNumFromUrl from './page-num-from-url';

describe('pageNumFromUrl(url)', () => {
  it('returns null if there is no page num in the url', () => {
    assert.equal(pageNumFromUrl('http://example.com'), null);
    assert.equal(pageNumFromUrl('http://example.com/?pg=102'), null);
    assert.equal(pageNumFromUrl('http://example.com/?page:102'), null);
  });

  it('returns a page num if one matches the url', () => {
    assert.equal(pageNumFromUrl('http://example.com/foo?page=1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?pg=1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?p=1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?paging=1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?pag=1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?pagination/1'), 1);
    assert.equal(pageNumFromUrl('http://example.com/foo?paging/99'), 99);
    assert.equal(pageNumFromUrl('http://example.com/foo?pa/99'), 99);
    assert.equal(pageNumFromUrl('http://example.com/foo?p/99'), 99);
  });
});
