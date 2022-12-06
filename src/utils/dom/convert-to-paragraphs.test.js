import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import convertToParagraphs from './convert-to-paragraphs';

describe('convertToParagraphs($)', () => {
  it('performs simple conversions', () => {
    // Skipping this one in the browser. It works, but since the browser wraps
    // elements in a div, the last span conversion won't work as expected.
    if (!cheerio.browser) {
      const before = `
        <p>
          Here is some text
          <span>This should remain in a p</span>
          <br />
          <br />
          This should be wrapped in a p
          <div>This should become a p</div>
        </p>
        <span>This should become a p</span>
      `;

      const after = `
        <p>
          Here is some text
          <span>This should remain in a p</span>
        <p>
          This should be wrapped in a p
        </p><p>This should become a p</p>
        </p> <p>This should become a p</p>
      `;
      let $ = cheerio.load(before);
      $ = convertToParagraphs($);
      assertClean($.html(), after);
    }
  });

  it('does not convert a div with nested p children', () => {
    const html = `
      <div>
        <div>
          <div>
            <p>This is a paragraph</p>
          </div>
        </div>
      </div>
    `;
    let $ = cheerio.load(html);
    $ = convertToParagraphs($);
    assertClean($.html(), html);
  });
});
