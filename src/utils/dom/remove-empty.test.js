import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { removeEmpty } from './index';

describe('removeEmpty($)', () => {
  it('removes empty P tags', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <p></p>
      </div>
    `);

    const result = removeEmpty($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('removes P tags with only space', () => {
    const html = '<div><p>  </p></div>';
    const $ = cheerio.load(html);

    const result = removeEmpty($('*').first(), $);
    assertClean(result.html(), '<div></div>');
  });

  it('does not remove empty DIV tags', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <p></p>
      </div>
    `);

    const result = removeEmpty($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('does not remove empty p tags containing an iframe', () => {
    const html = '<div><p><span><iframe src="foo"></iframe></span></p></div>';
    const $ = cheerio.load(html);

    const result = removeEmpty($('*').first(), $);
    assertClean(result.html(), html);
  });
});
