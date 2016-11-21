import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';
import HTML from './fixtures/html';

import convertToParagraphs from './convert-to-paragraphs';

function assertBeforeAndAfter(key, fn) {
  const $ = cheerio.load(HTML[key].before);
  assertClean(fn($).html(), HTML[key].after);
}

describe('convertToParagraphs($)', () => {
  it('performs simple conversions', () => {
    // Skipping this one in the browser. It works, but since the browser wraps
    // elements in a div, the last span conversion won't work as expected.
    if (!cheerio.browser) {
      assertBeforeAndAfter('convertToParagraphs', convertToParagraphs);
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
    const $ = cheerio.load(html);
    assertClean(convertToParagraphs($).html(), html);
  });
});
