import assert from 'assert';
import cheerio from 'cheerio';
import extractBestNode from './extract-best-node';

const fs = require('fs');

describe('extractBestNode($, flags)', () => {
  it('scores the dom nodes and returns the best option', () => {
    const html = fs.readFileSync('./fixtures/www.latimes.com.html', 'utf-8');
    const $ = cheerio.load(html);

    const bestNode = extractBestNode($, {
      stripUnlikelyCandidates: true,
      weightNodes: true,
    });

    assert(typeof bestNode, 'object');
  });
});
