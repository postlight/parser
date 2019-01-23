import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';
import { cleanTitle } from './index';

describe('cleanTitle(title, { url, $ })', () => {
  it('only uses h1 if there is only one on the page', () => {
    const title = 'Too Short';
    const $ = cheerio.load(HTML.docWith2H1s);

    assert.equal(cleanTitle(title, { url: '', $ }), title);
  });

  it('removes HTML tags from titles', () => {
    const $ = cheerio.load(HTML.docWithTagsInH1.before);
    const title = $('h1').html();

    assert.equal(cleanTitle(title, { url: '', $ }), HTML.docWithTagsInH1.after);
  });

  it('trims extraneous spaces', () => {
    const title = " This Is a Great Title That You'll Love ";
    const $ = cheerio.load(HTML.docWithTagsInH1.before);

    assert.equal(cleanTitle(title, { url: '', $ }), title.trim());
  });
});
