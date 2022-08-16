import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { cleanImages } from './index';

describe('cleanImages($)', () => {
  it('removes images with small heights/widths', () => {
    const $ = cheerio.load(`
      <div>
        <img width="5" height="5" />
        <img width="50" />
      </div>
    `);

    const result = cleanImages($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img width="50">
      </div>
    `
    );
  });

  it('removes height attribute from images that remain', () => {
    const $ = cheerio.load(`
      <div>
        <img width="50" height="50" />
      </div>
    `);

    const result = cleanImages($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img width="50">
      </div>
    `
    );
  });

  it('removes spacer/transparent images', () => {
    const $ = cheerio.load(`
      <div>
        <img src="/foo/bar/baz/spacer.png" />
        <img src="/foo/bar/baz/normal.png" />
        <p>Some text</p>
      </div>
    `);

    const result = cleanImages($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <img src="/foo/bar/baz/normal.png">
        <p>Some text</p>
      </div>
    `
    );
  });
});
