import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { markToKeep } from './index';
import {
  KEEP_CLASS,
} from './constants';

describe('markToKeep($)', () => {
  it('marks elements that should be kept', () => {
    const $ = cheerio.load(HTML.marksYouTube.before);

    const result = markToKeep($('*').first(), $);
    assertClean(result.html(), HTML.marksYouTube.after);
  });

  it('marks same-domain elements to keep', () => {
    const html =
      '<div><iframe src="https://medium.com/foo/bar"></iframe></div>';
    const $ = cheerio.load(html);

    const result = markToKeep(
      $('*').first(),
      $,
      'https://medium.com/foo'
    );

    const keptHtml =
      `<div><iframe src="https://medium.com/foo/bar" class="${KEEP_CLASS}"></iframe></div>`;
    assertClean(result.html(), keptHtml);
  });
});
