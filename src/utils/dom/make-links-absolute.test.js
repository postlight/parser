import assert from 'assert';
import cheerio from 'cheerio';

import makeLinksAbsolute from './make-links-absolute';

const getResultHtml = (result, $) => {
  if (cheerio.browser) {
    return result.html();
  }

  return $.html(result);
};

describe('makeLinksAbsolute($)', () => {
  it('makes relative #hrefs absolute', () => {
    const html = '<div><a href="#foo">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = makeLinksAbsolute($content, $, 'http://example.com');
    const resultHtml = getResultHtml(result, $);

    assert.equal(resultHtml, '<div><a href="http://example.com/#foo">bar</a></div>');
  });

  it('makes relative ./relative paths absolute', () => {
    const html = '<div><a href="foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = makeLinksAbsolute($content, $, 'http://example.com/baz/bat');
    const resultHtml = getResultHtml(result, $);

    assert.equal(resultHtml, '<div><a href="http://example.com/baz/foo/bar">bar</a></div>');
  });

  it('makes relative /root/paths absolute', () => {
    const html = '<div><a href="/foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = makeLinksAbsolute($content, $, 'http://example.com/baz/bat');
    const resultHtml = getResultHtml(result, $);

    assert.equal(resultHtml, '<div><a href="http://example.com/foo/bar">bar</a></div>');
  });

  it('makes relative srcs absolute', () => {
    const html = '<div><img src="#foo"></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = makeLinksAbsolute($content, $, 'http://example.com');
    const resultHtml = getResultHtml(result, $);

    assert.equal(resultHtml, '<div><img src="http://example.com/#foo"></div>');
  });
});
