import assert from 'assert';
import cheerio from 'cheerio';
import fs from 'fs';

import HTML from './fixtures/html';

import {
  getScore,
  findTopCandidate,
  scoreContent,
} from './index';

describe('findTopCandidate($)', () => {
  it('finds the top candidate from simple case', () => {
    const $ = cheerio.load(HTML.findDom1);

    const $$topCandidate = findTopCandidate($);

    assert.equal(getScore($$topCandidate), 100);
  });

  it('finds the top candidate from a nested case', () => {
    const $ = cheerio.load(HTML.findDom2);

    const $$topCandidate = findTopCandidate($);

    // this is wrapped in a div so checking
    // the score of the first child
    assert.equal(getScore($$topCandidate.children().first()), 50);
  });

  it('ignores tags like BR', () => {
    const $ = cheerio.load(HTML.findDom3);

    const $topCandidate = findTopCandidate($);

    assert.equal(getScore($topCandidate), 50);
  });

  it('returns BODY if no candidates found', () => {
    const $ = cheerio.load(HTML.topBody);

    const $topCandidate = findTopCandidate($);

    assert.equal($topCandidate.get(0).tagName, 'body');
  });

  it('appends a sibling with a good enough score', () => {
    const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8');

    let $ = cheerio.load(html);
    $ = scoreContent($);

    const $topCandidate = findTopCandidate($);
    assert.equal($($topCandidate).text().length, 3652);
  });
});

