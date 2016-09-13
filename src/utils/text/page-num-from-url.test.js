import assert from 'assert';

import pageNumFromUrl from './page-num-from-url';

describe('pageNumFromUrl(url)', () => {
  it('returns null if there is no page num in the url', () => {
    const url1 = 'http://example.com';
    assert.equal(pageNumFromUrl(url1), null);

    const url2 = 'http://example.com/?pg=102';
    assert.equal(pageNumFromUrl(url2), null);

    const url3 = 'http://example.com/?page:102';
    assert.equal(pageNumFromUrl(url3), null);
  });

  it('returns a page num if one matches the url', () => {
    const url1 = 'http://example.com/foo?page=1';
    assert.equal(pageNumFromUrl(url1), 1);

    const url2 = 'http://example.com/foo?pg=1';
    assert.equal(pageNumFromUrl(url2), 1);

    const url3 = 'http://example.com/foo?p=1';
    assert.equal(pageNumFromUrl(url3), 1);

    const url4 = 'http://example.com/foo?paging=1';
    assert.equal(pageNumFromUrl(url4), 1);

    const url5 = 'http://example.com/foo?pag=1';
    assert.equal(pageNumFromUrl(url5), 1);

    const url6 = 'http://example.com/foo?pagination/1';
    assert.equal(pageNumFromUrl(url6), 1);

    const url7 = 'http://example.com/foo?paging/88';
    assert.equal(pageNumFromUrl(url7), 88);

    const url8 = 'http://example.com/foo?pa/88';
    assert.equal(pageNumFromUrl(url8), 88);

    const url9 = 'http://example.com/foo?p/88';
    assert.equal(pageNumFromUrl(url9), 88);
  });
});
