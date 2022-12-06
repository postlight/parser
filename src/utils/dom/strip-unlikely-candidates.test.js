import assert from 'assert';
import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';
import stripUnlikelyCandidates from './strip-unlikely-candidates';

describe('Generic Extractor Utils', () => {
  describe('stripUnlikelyCandidates(node)', () => {
    it('returns original doc if no matches found', () => {
      const html = `
        <div id="foo">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(html);
      $ = stripUnlikelyCandidates($);
      assert.equal($.html(), html);
    });

    it('strips unlikely matches from the doc', () => {
      const before = `
        <div class="header">Stuff</div>
        <div class="article">
          <p>Ooo good one</p>
        </div>
      `;
      const after = `
        <div class="article">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = stripUnlikelyCandidates($);
      assertClean($.html(), after);
    });

    it('keeps likely matches even when they also match the blacklist', () => {
      const before = `
        <div class="article adbox">
          <p>Ooo good one</p>
        </div>
      `;

      const after = `
        <div class="article adbox">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = stripUnlikelyCandidates($);
      assertClean($.html(), after);
    });

    it('removed likely matches when inside blacklist node', () => {
      const before = `
        <div>
          <div class="adbox">
            <div class="article">
              <p>Ooo good one</p>
            </div>
          </div>
          <div>Something unrelated</div>
        </div>
      `;

      const after = `
        <div>
          <div>Something unrelated</div>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = stripUnlikelyCandidates($);
      assertClean($.html(), after);
    });
  });
});
