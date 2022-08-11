import cheerio from 'cheerio';
import assert from 'assert';

import { assertClean } from 'test-helpers';

import { markToKeep } from './index';
import { KEEP_CLASS } from './constants';

describe('markToKeep($)', () => {
  it('marks elements that should be kept', () => {
    const $ = cheerio.load(`
      <div>
        <p>What an article</p>
        <iframe src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen></iframe>
        <iframe src="foo" frameborder="0" allowfullscreen></iframe>
        <iframe src="https://player.vimeo.com/video/57712615"></iframe>
      </div>
    `);

    const result = markToKeep($('*').first(), $);

    assert.equal(result('iframe.mercury-parser-keep').length, 2);

    if (!$.browser) {
      assertClean(
        result.html(),
        `
        <div>
          <p>What an article</p>
          <iframe src="https://www.youtube.com/embed/_2AqQV8wDvY" frameborder="0" allowfullscreen class="mercury-parser-keep"></iframe>
          <iframe src="foo" frameborder="0" allowfullscreen></iframe>
          <iframe src="https://player.vimeo.com/video/57712615" class="mercury-parser-keep"></iframe>
        </div>
    `
      );
    }
  });

  it('marks same-domain elements to keep', () => {
    const $ = cheerio.load(
      '<div><iframe src="https://medium.com/foo/bar"></iframe></div>'
    );
    const result = markToKeep($('*').first(), $, 'https://medium.com/foo');

    const keptHtml = `<div><iframe src="https://medium.com/foo/bar" class="${KEEP_CLASS}"></iframe></div>`;
    assertClean(result.html(), keptHtml);
  });
});
