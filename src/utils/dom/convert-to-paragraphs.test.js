import cheerio from 'cheerio';
import assert from 'assert';
import fs from 'fs';

import { assertClean } from 'test-helpers';
import HTML from './fixtures/html';

import convertToParagraphs from './convert-to-paragraphs';

function assertBeforeAndAfter(key, fn) {
  const $ = cheerio.load(HTML[key].before);
  assertClean(fn($).html(), HTML[key].after);
}

describe('convertToParagraphs($)', () => {
  it('performs simple conversions', () => {
    assertBeforeAndAfter('convertToParagraphs', convertToParagraphs);
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

  it('tracks this', () => {
    const html = fs.readFileSync('./fixtures/vulture.html', 'utf-8');
    let $ = cheerio.load(html);
    $ = convertToParagraphs($);

    assert.equal($('p[score]').length, 62);
  });
});

