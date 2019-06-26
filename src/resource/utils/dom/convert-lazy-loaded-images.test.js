import assert from 'assert';
import cheerio from 'cheerio';

import convertLazyLoadedImages from './convert-lazy-loaded-images';

describe('convertLazyLoadedImages($)', () => {
  it('moves image links to src if placed in another attribute', () => {
    const html = '<img data-src="http://example.com/foo.jpg">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(
      result,
      '<img data-src="http://example.com/foo.jpg" src="http://example.com/foo.jpg">'
    );
  });

  it('moves image source candidates to srcset if placed in another attribute', () => {
    const html = '<img data-srcset="http://example.com/foo.jpg 2x">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(
      result,
      '<img data-srcset="http://example.com/foo.jpg 2x" srcset="http://example.com/foo.jpg 2x">'
    );
  });

  it('moves image source candidates containing query strings to srcset if placed in another attribute', () => {
    const html =
      '<img data-srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(
      result,
      '<img data-srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x" srcset="http://example.com/foo.jpg?w=400 2x, http://example.com/foo.jpg?w=600 3x">'
    );
  });

  it('properly handles src and srcset attributes', () => {
    const html =
      '<img data-src="http://example.com/foo.jpg" data-srcset="http://example.com/foo.jpg 2x">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(
      result,
      '<img data-src="http://example.com/foo.jpg" data-srcset="http://example.com/foo.jpg 2x" src="http://example.com/foo.jpg" srcset="http://example.com/foo.jpg 2x">'
    );
  });

  it('does nothing when value is not a link', () => {
    // This is far from perfect, since a relative url could
    // be perfectly correct.
    const html = '<img data-src="foo.jpg">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(result, '<img data-src="foo.jpg">');
  });

  it('does nothing when value is not an image', () => {
    const html = '<img data-src="http://example.com">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(result, '<img data-src="http://example.com">');
  });

  it('does not change a correct img with src', () => {
    const html = '<img src="http://example.com/foo.jpg">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(result, '<img src="http://example.com/foo.jpg">');
  });

  it('does not replace an img src with srcset value', () => {
    const html =
      '<img src="http://example.com/foo.jpg" srcset="http://example.com/foo2x.jpg 2x, http://example.com/foo.jpg">';
    const $ = cheerio.load(html);

    const result = convertLazyLoadedImages($).html();

    assert.equal(
      result,
      '<img src="http://example.com/foo.jpg" srcset="http://example.com/foo2x.jpg 2x, http://example.com/foo.jpg">'
    );
  });
});
