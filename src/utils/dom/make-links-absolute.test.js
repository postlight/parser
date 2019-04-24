import assert from 'assert';
import cheerio from 'cheerio';

import makeLinksAbsolute from './make-links-absolute';

describe('makeLinksAbsolute($)', () => {
  it('makes relative #hrefs absolute', () => {
    const html = '<div><a href="#foo">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

    assert.equal(
      result,
      '<div><a href="http://example.com/#foo">bar</a></div>'
    );
  });

  it('makes relative ./relative paths absolute', () => {
    const html = '<div><a href="foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(
      makeLinksAbsolute($content, $, 'http://example.com/baz/bat')
    );

    assert.equal(
      result,
      '<div><a href="http://example.com/baz/foo/bar">bar</a></div>'
    );
  });

  it('makes relative /root/paths absolute', () => {
    const html = '<div><a href="/foo/bar">bar</a></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(
      makeLinksAbsolute($content, $, 'http://example.com/baz/bat')
    );

    assert.equal(
      result,
      '<div><a href="http://example.com/foo/bar">bar</a></div>'
    );
  });

  it('makes relative srcs absolute', () => {
    const html = '<div><img src="#foo"></div>';
    const $ = cheerio.load(html);
    const $content = $('*').first();

    const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

    assert.equal(result, '<div><img src="http://example.com/#foo"></div>');
  });

  describe('makes relative srcsets absolute', () => {
    /**
     * The spec for srcset requires a space character following the comma separating character
     * when a candidate that doesn't contain a descriptor needs to be followed by another candidate,
     * otherwise, that candidate would be treated as part of the succeeding candidate filename.
     * This requirement allows for URLs that contain comma character but no un-encoded spaces.
     *
     * srcset candidates that all contain descriptors, can safely be separated by commas
     * without the need for a space character.
     */
    it('handles invalid srcsets as per their invalid implementation', () => {
      /**
       * The following srcset values would be interpreted (by browsers, and pasrsed similarly)
       * as follows:
       * (1) the first source tag - one candidate:
       *      assets/images/rhythm/076.jpg,assets/images/rhythm/076@2x.jpg 2x
       * (2) the second source tag - two candidates:
       *      assets/images/rhythm/120@2x.jpg 2x
       *      assets/images/rhythm/120.jpg,assets/images/rhythm/120@3x.jpg 3x
       * (3) the third source tag - two candidates:
       *      assets/images/rhythm/240.jpg,assets/images/rhythm/240@2x.jpg 2x,
       *      assets/images/rhythm/240@3x.jpg 3x
       */
      const html = `<div>
        <picture>
          <source srcset="assets/images/rhythm/076.jpg,assets/images/rhythm/076@2x.jpg 2x" media="(max-width: 450px)">
          <source srcset="assets/images/rhythm/120@2x.jpg 2x, assets/images/rhythm/120.jpg,assets/images/rhythm/120@3x.jpg 3x" media="(max-width: 900px)">
          <source srcset="assets/images/rhythm/240.jpg,assets/images/rhythm/240@2x.jpg 2x,assets/images/rhythm/240@3x.jpg 3x" media="(min-width: 901px)">
          <img src="assets/images/rhythm/120.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg,assets/images/rhythm/076@2x.jpg 2x" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/120@2x.jpg 2x, http://example.com/assets/images/rhythm/120.jpg,assets/images/rhythm/120@3x.jpg 3x" media="(max-width: 900px)">
          <source srcset="http://example.com/assets/images/rhythm/240.jpg,assets/images/rhythm/240@2x.jpg 2x, http://example.com/assets/images/rhythm/240@3x.jpg 3x" media="(min-width: 901px)">
          <img src="http://example.com/assets/images/rhythm/120.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('does nothing when the srcset is empty or just whitespace', () => {
      const html = `<div>
        <picture>
          <source srcset="" media="(max-width: 450px)">
          <source srcset=" ">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="" media="(max-width: 450px)">
          <source srcset=" ">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('handles comma separated (with whitespace) srcset files with device-pixel-ratio descriptors', () => {
      const html = `<div>
        <picture>
          <source srcset="assets/images/rhythm/076.jpg 2x, assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="assets/images/rhythm/076@2x.jpg 2x, assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x, http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x, http://example.com/assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('handles comma separated (without whitespace) srcset files with device-pixel-ratio descriptors', () => {
      const html = `<div>
        <picture>
          <source srcset="assets/images/rhythm/076.jpg 2x,assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="assets/images/rhythm/076@2x.jpg 2x,assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x, http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x, http://example.com/assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('handles comma separated (with whitespace) srcset files with width descriptors', () => {
      const html = `<div>
        <img srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <img srcset="http://example.com/elva-fairy-320w.jpg 320w, http://example.com/elva-fairy-480w.jpg 480w, http://example.com/elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="http://example.com/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`
      );
    });

    it('handles multiline comma separated srcset files with width descriptors', () => {
      const html = `<div>
        <img srcset="elva-fairy-320w.jpg 320w,
          elva-fairy-480w.jpg 480w,
          elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'http://example.com')
      );

      assert.equal(
        result,
        `<div>
        <img srcset="http://example.com/elva-fairy-320w.jpg 320w, http://example.com/elva-fairy-480w.jpg 480w, http://example.com/elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="http://example.com/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`
      );
    });

    it('handles URLs that contain a comma', () => {
      const html = `<div>
        <picture><source media="(min-width: 768px)" srcset="cartoons/5bbfca021e40b62d6cc418ea/master/w_280,c_limit/181022_a22232.jpg, cartoons/5bbfca021e40b62d6cc418ea/master/w_560,c_limit/181022_a22232.jpg 2x"/><source srcset="cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg, cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,c_limit/181022_a22232.jpg 2x"/><img src="cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg" /></picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(
        makeLinksAbsolute($content, $, 'https://media.newyorker.com/')
      );

      assert.equal(
        result,
        `<div>
        <picture><source media="(min-width: 768px)" srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_280,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_560,c_limit/181022_a22232.jpg 2x"><source srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,c_limit/181022_a22232.jpg 2x"><img src="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg"></picture>
      </div>`
      );
    });
  });
});
