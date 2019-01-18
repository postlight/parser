import assert from 'assert';
import cheerio from 'cheerio';
import extractBestNode from './extract-best-node';

const fs = require('fs');

describe('extractBestNode($, flags)', () => {
  it('scores the dom nodes and returns the best option', () => {
    const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8');
    const opts = {
      stripUnlikelyCandidates: true,
      weightNodes: true,
    };

    const $ = cheerio.load(html);

    const bestNode = extractBestNode($, opts);

    assert(typeof bestNode, 'object');
  });
});
