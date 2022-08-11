import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { cleanHeaders } from './index';

describe('cleanHeaders(article, $)', () => {
  it('parses html and returns the article', () => {
    const $ = cheerio.load(`
      <div>
        <h2>Lose me</h2>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `);

    const result = cleanHeaders($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('removes headers when the header text matches the title', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <h2>Title Match</h2>
        <p>What do you think?</p>
      </div>
    `);

    const result = cleanHeaders($('*').first(), $, 'Title Match');
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('removes headers with a negative weight', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <h2 class="advert">Bad Class, Bad Weight</h2>
        <p>What do you think?</p>
      </div>
    `);

    const result = cleanHeaders($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });
});
