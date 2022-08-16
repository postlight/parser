import assert from 'assert';
import cheerio from 'cheerio';

import { linkDensity } from './index';

describe('linkDensity($)', () => {
  it('returns 0.5 if half of the text is a link', () => {
    const $ = cheerio.load(`
      <div><p>Some text!</p><p><a href="">Some text!</a></p> </div>
    `);

    const density = linkDensity($('div').first(), $);

    assert.equal(density, 0.5);
  });

  it('returns 1 if all of the text is a link', () => {
    const $ = cheerio.load(`
      <div><p><a href="">Some text!</a></p></div>
    `);

    const density = linkDensity($('div').first(), $);

    assert.equal(density, 1);
  });

  it("returns 0 if there's no text", () => {
    const $ = cheerio.load(`
      <div><p><a href=""></a></p></div>
    `);

    const density = linkDensity($('div').first());

    assert.equal(density, 0);
  });
});
