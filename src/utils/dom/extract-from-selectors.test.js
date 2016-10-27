import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/extract-from-selectors';
import extractFromSelectors from './extract-from-selectors';

describe('extractFromSelectors($, selectors, maxChildren, textOnly)', () => {
  it('extracts an arbitrary node by selector', () => {
    const $ = cheerio.load(HTML.simpleSelector.test);
    const result = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.simpleSelector.result);
  });

  it('ignores comments', () => {
    const $ = cheerio.load(HTML.insideComment.test);
    const result = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.insideComment.result);
  });

  it('skips a selector if it matches multiple nodes', () => {
    const $ = cheerio.load(HTML.multiMatch.test);
    const result = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.multiMatch.result);
  });

  it('skips a node with too many children', () => {
    const $ = cheerio.load(HTML.manyChildren.test);
    const result = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.manyChildren.result);
  });
});
