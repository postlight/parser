import assert from 'assert';
import cheerio from 'cheerio';

import convertNodeTo from './convert-node-to';

describe('convertNodeTo(node, $)', () => {
  it('takes a node and converts it to a diff tag', () => {
    const html = '<div>Should become a p</div>';
    const $ = cheerio.load(html);
    const node = $('div').first();

    const result = convertNodeTo(node, $).html();
    const after = '<p>Should become a p</p>';

    assert.equal(result, after);
  });

  it('retains attributes on conversion', () => {
    const html = '<span class="foo" score="100">Should keep its attrs</span>';
    const $ = cheerio.load(html);
    const node = $('span').first();

    const result = convertNodeTo(node, $, 'div').html();
    const after = '<div class="foo" score="100">Should keep its attrs</div>';

    assert.equal(result, after);
  });

  it('does nothing if node.get returns null', () => {
    const html = '<span class="foo" score="100">Should keep its attrs</span>';
    const $ = cheerio.load(html);
    const node = {
      get: () => null,
    };

    const result = convertNodeTo(node, $, 'div').html();

    assert.equal(result, html);
  });

  // In the browser, the contents of noscript tags aren't rendered, therefore
  // transforms on the noscript tag (commonly used for lazy-loading) don't work
  // as expected. This test case handles that
  it('handles noscript tags in the browser', () => {
    const html = '<noscript><img src="http://example.com" /></noscript>';
    const resultHtml = '<figure><img src="http://example.com"></figure>';
    const $ = cheerio.load(html);
    const node = $('noscript');

    const result = convertNodeTo(node, $, 'figure', 'noscript').html();

    assert.equal(result, resultHtml);
  });
});
