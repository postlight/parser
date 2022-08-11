import cheerio from 'cheerio';
import assert from 'assert';

import { assertClean } from 'test-helpers';

import { stripJunkTags } from './index';

describe('stripJunkTags($)', () => {
  it('strips script and other junk tags', () => {
    const $ = cheerio.load(`
      <div>
        <style>.red { color: 'red'; }</style>
        <title>WOW</title>
        <link rel="asdflkjawef" />
        <p>What an article</p>
        <script type="text/javascript">alert('hi!');</script>
        <noscript>Don't got it</noscript>
        <hr />
      </div>
    `);

    const result = stripJunkTags($('*').first(), $);
    assertClean(
      result.html(),
      `
      <div>
        <p>What an article</p>
      </div>
    `
    );
  });

  it('keeps youtube embeds', () => {
    let $ = cheerio.load(`
      <div>
        <style>.red { color: 'red'; }</style>
        <title>WOW</title>
        <link rel="asdflkjawef" />
        <p>What an article</p>
        <iframe class="mercury-parser-keep" src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen></iframe>
        <hr />
      </div>
    `);

    $ = stripJunkTags($('*').first(), $);
    assert.equal($('iframe[src^="https://www.youtube.com"]').length, 1);
  });
});
