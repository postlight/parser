import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import { cleanTags } from './index';

describe('cleanTags($)', () => {
  it('drops a matching node with a negative score', () => {
    const $ = cheerio.load(HTML.dropNegativeScore.before);

    const result = cleanTags($('*').first(), $);
    // again small adjustments for cheerio vs. jquery implementation quirks
    // not functionally significant
    assertClean(
      result.html(),
      cheerio.browser
        ? HTML.dropNegativeScore.afterBrowser
        : HTML.dropNegativeScore.after
    );
  });

  it('removes a node with too many inputs', () => {
    const $ = cheerio.load(HTML.removeTooManyInputs.before);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(result.html(), HTML.removeTooManyInputs.after);
  });

  it('removes a div with no images and very little text', () => {
    const $ = cheerio.load(HTML.removeShortNoImg.before);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(result.html(), HTML.removeShortNoImg.after);
  });

  it('removes a node with a link density that is too high', () => {
    const $ = cheerio.load(HTML.linkDensityHigh.before);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(result.html(), HTML.linkDensityHigh.after);
  });

  it('removes a node with a good score but link density > 0.5', () => {
    const $ = cheerio.load(HTML.linkDensityHigh.before);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(result.html(), HTML.linkDensityHigh.after);
  });

  it('keeps node with a good score but link density > 0.5 if preceding text ends in colon', () => {
    const $ = cheerio.load(HTML.previousEndsInColon.before);

    const result = cleanTags($('*').first(), $);
    assertClean(result.html(), HTML.previousEndsInColon.before);
  });

  it('keeps anything with a class of entry-content-asset', () => {
    const $ = cheerio.load(HTML.cleanEntryContentAsset.before);

    const result = cleanTags($('*').first(), $);
    assertClean(result.html(), HTML.cleanEntryContentAsset.before);
  });
});
