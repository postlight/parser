import assert from 'assert';
import cheerio from 'cheerio';

import extractBestNode from 'extractors/generic/content/extract-best-node';
import extractCleanNode from './content';

const fs = require('fs');

describe('extractCleanNode(article, { $, cleanConditionally, title } })', () => {
  it('cleans cruft out of a DOM node', () => {
    const html = fs.readFileSync('./fixtures/wired.html', 'utf-8');
    const $ = cheerio.load(html);

    const opts = {
      stripUnlikelyCandidates: true,
      weightNodes: true,
      cleanConditionally: true,
    };

    const bestNode = extractBestNode($, opts);

    const cleanNode = extractCleanNode(bestNode, { $, opts });

    const text = $(cleanNode)
      .text()
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    assert.equal(text.length === 2656 || text.length === 2657, true);
  });
});
