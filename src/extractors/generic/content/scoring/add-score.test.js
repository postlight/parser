import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';
import { addScore, getScore, addToParent, getOrInitScore } from './index';

describe('Scoring utils', () => {
  describe('addScore(node, $, amount)', () => {
    it("adds the specified amount to a node's score", () => {
      const $ = cheerio.load('<p score="25">Foo</p>');
      let $node = $('p').first();

      $node = addScore($node, $, 25);
      assert.equal(getScore($node), 50);
    });

    it('adds score if score not yet set (assumes score is 0)', () => {
      const $ = cheerio.load('<p>Foo</p>');
      let $node = $('p').first();

      $node = addScore($node, $, 25);
      assert.equal(getScore($node), 25);
    });
  });
  describe('addToParent(node, $, amount)', () => {
    it("adds 1/4 of a node's score it its parent", () => {
      const html = '<div score="25"><p score="40">Foo</p></div>';
      const $ = cheerio.load(html);
      let $node = $('p').first();

      $node = addToParent($node, $, 40);

      assert.equal(getScore($node.parent()), 35);
      assert.equal(getScore($node), 40);
    });
  });
});

describe('getOrInitScore(node, $)', () => {
  describe('when score set', () => {
    it("returns score if node's score already set", () => {
      const html = '<p score="40">Foo</p>';
      const $ = cheerio.load(html);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 40);
    });
  });

  describe('when no score set', () => {
    it('returns 0 if no class/id and text < 25 chars', () => {
      const html = '<p>Foo</p>';
      const $ = cheerio.load(html);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 0);
    });

    it('returns score if no class/id and has commas/length', () => {
      const $ = cheerio.load(HTML.score19);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 19);
    });

    it('returns greater score if weighted class/id is set', () => {
      const $ = cheerio.load(HTML.score44);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 44);
    });

    it('gives 1/4 of its score to its parent', () => {
      const $ = cheerio.load(HTML.score44Parent);
      const node = $('p').first();

      getOrInitScore(node, $);

      assert.equal(getScore(node.parent()), 16);
    });
  });
});
