import assert from 'assert';
import cheerio from 'cheerio';

import { normalizeSpaces } from './index';

describe('normalizeSpaces(text)', () => {
  it('normalizes spaces from text', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
      </div>
    `);

    const result = normalizeSpaces(
      $('*')
        .first()
        .text()
    );
    assert.equal(result, 'What do you think?');
  });

  it('preserves spaces in preformatted text blocks', () => {
    const $ = cheerio.load(`
      <div>
        <p>What   do  you    think?</p>
        <pre>  What     happens to        spaces?    </pre>
      </div>
    `);

    const result = normalizeSpaces($.html());
    assert.equal(
      result,
      '<div> <p>What do you think?</p> <pre>  What     happens to        spaces?    </pre> </div>'
    );
  });
});
