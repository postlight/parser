import assert from 'assert';
import cheerio from 'cheerio';

import makeLinksAbsolute from './make-links-absolute';

describe('makeLinksAbsolute($)', () => {
  it('makes relative #hrefs absolute', () => {
    const html = '<div><a href="#foo">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

    assert.equal(result, '<div><a href="http://example.com/#foo">bar</a></div>');
  });

  it('makes relative ./relative paths absolute', () => {
    const html = '<div><a href="foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com/baz/bat'));

    assert.equal(result, '<div><a href="http://example.com/baz/foo/bar">bar</a></div>');
  });

  it('makes relative /root/paths absolute', () => {
    const html = '<div><a href="/foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com/baz/bat'));

    assert.equal(result, '<div><a href="http://example.com/foo/bar">bar</a></div>');
  });

  it('makes relative srcs absolute', () => {
    const html = '<div><img src="#foo"></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

    assert.equal(result, '<div><img src="http://example.com/#foo"></div>');
  });
});
