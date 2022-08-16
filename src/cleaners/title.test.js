import assert from 'assert';
import cheerio from 'cheerio';

import { cleanTitle } from './index';

describe('cleanTitle(title, { url, $ })', () => {
  it('only uses h1 if there is only one on the page', () => {
    const title = 'Too Short';
    const $ = cheerio.load(`
      <div>
        <h1>This Is the Real Title</h1>
        <h1>This Is the Real Title</h1>
      </div>
    `);

    assert.equal(cleanTitle(title, { url: '', $ }), title);
  });

  it('removes HTML tags from titles', () => {
    const $ = cheerio.load(
      '<div><h1>This Is the <em>Real</em> Title</h1></div>'
    );
    const title = $('h1').html();

    assert.equal(cleanTitle(title, { url: '', $ }), 'This Is the Real Title');
  });

  it('trims extraneous spaces', () => {
    const title = " This Is a Great Title That You'll Love ";
    const $ = cheerio.load(
      '<div><h1>This Is the <em>Real</em> Title</h1></div>'
    );

    assert.equal(cleanTitle(title, { url: '', $ }), title.trim());
  });
});
