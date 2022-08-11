import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { cleanAttributes } from './index';

describe('cleanAttributes($)', () => {
  it('removes style attributes from nodes', () => {
    const $ = cheerio.load(`
      <div>
        <p style="color: red;">What do you think?</p>
      </div>
    `);

    const result = cleanAttributes($('*').first(), $);
    assertClean(
      $.html(result),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('removes align attributes from nodes', () => {
    const $ = cheerio.load(`
      <div>
        <p style="color: red;" align="center">What do you think?</p>
      </div>
    `);

    const result = cleanAttributes($('*').first(), $);
    assertClean(
      $.html(result),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });
});
