import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { cleanHOnes } from './index';

describe('cleanHOnes($)', () => {
  it('removes H1s if there are less than 3 of them', () => {
    const $ = cheerio.load(`
      <div>
        <h1>Look at this!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
      </div>
    `);

    const result = cleanHOnes($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('converts H1s to H2s if there are 3 or more of them', () => {
    const $ = cheerio.load(`
      <div>
        <h1>Look at this!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
      </div>
    `);

    const result = cleanHOnes($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <h2>Look at this!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
      </div>
    `
    );
  });
});
