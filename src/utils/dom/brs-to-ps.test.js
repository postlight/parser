import assert from 'assert';
import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';
import brsToPs from './brs-to-ps';

describe('Generic Extractor Utils', () => {
  describe('brsToPs(node)', () => {
    it('does nothing when no BRs present', () => {
      const html = `
        <div id="entry">
          <p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(html);
      $ = brsToPs($);
      assert.equal($.html(), html);
    });

    it('does nothing when a single BR is present', () => {
      const before = `
        <div class="article adbox">
          <br>
          <p>Ooo good one</p>
        </div>
      `;

      const after = `
        <div class="article adbox">
          <br>
          <p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = brsToPs($);
      assertClean($.html(), after);
    });

    it('converts double BR tags to an empty P tag', () => {
      const before = `
        <div class="article adbox">
          <br />
          <br />
          <p>Ooo good one</p>
        </div>
      `;

      const after = `
        <div class="article adbox">
          <p> </p><p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = brsToPs($);
      assertClean($.html(), after);
    });

    it('converts several BR tags to an empty P tag', () => {
      const before = `
        <div class="article adbox">
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>Ooo good one</p>
        </div>
      `;

      const after = `
        <div class="article adbox">
          <p> </p><p>Ooo good one</p>
        </div>
      `;
      let $ = cheerio.load(before);
      $ = brsToPs($);
      assertClean($.html(), after);
    });

    it('converts BR tags in a P tag into a P containing inline children', () => {
      const before = `
        <p>
          Here is some text
          <br />
          <br />
          Here is more text
        </p>
      `;

      const after = `
        <p>
          Here is some text
        <p>
          Here is more text
        </p></p>
      `;
      let $ = cheerio.load(before);
      $ = brsToPs($);
      assertClean($.html(), after);
    });
  });
});
