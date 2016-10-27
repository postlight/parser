import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';

import { linkDensity } from './index';

describe('linkDensity($)', () => {
  it('returns 0.5 if half of the text is a link', () => {
    const $ = cheerio.load(HTML.linkDensity5);

    const density = linkDensity($('div').first(), $);

    assert.equal(density, 0.5);
  });

  it('returns 1 if all of the text is a link', () => {
    const $ = cheerio.load(HTML.linkDensity1);

    const density = linkDensity($('div').first(), $);

    assert.equal(density, 1);
  });

  it("returns 0 if there's no text", () => {
    const $ = cheerio.load(HTML.linkDensity0);

    const density = linkDensity($('div').first());

    assert.equal(density, 0);
  });
});
