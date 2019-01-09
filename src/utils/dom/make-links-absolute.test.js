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
    it('handles comma separated (with whitespace) srcset files and device-pixel-ratio descriptors', () => {
      const html = `<div>
        <picture>
          <source srcset="assets/images/rhythm/076.jpg 2x, assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="assets/images/rhythm/076@2x.jpg 2x, assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x,http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x,http://example.com/assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('handles comma separated (without whitespace) srcset files and device-pixel-ratio descriptors', () => {
      const html = `<div>
        <picture>
          <source srcset="assets/images/rhythm/076.jpg 2x,assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="assets/images/rhythm/076@2x.jpg 2x,assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

      assert.equal(
        result,
        `<div>
        <picture>
          <source srcset="http://example.com/assets/images/rhythm/076.jpg 2x,http://example.com/assets/images/rhythm/076.jpg" media="(max-width: 450px)">
          <source srcset="http://example.com/assets/images/rhythm/076@2x.jpg 2x,http://example.com/assets/images/rhythm/076.jpg">
          <img src="http://example.com/assets/images/rhythm/076.jpg" alt="Vertical and horizontal rhythm">
        </picture>
      </div>`
      );
    });

    it('handles comma separated (with whitespace) srcset files and width descriptors', () => {
      const html = `<div>
        <img srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

      assert.equal(
        result,
        `<div>
        <img srcset="http://example.com/elva-fairy-320w.jpg 320w,http://example.com/elva-fairy-480w.jpg 480w,http://example.com/elva-fairy-800w.jpg 800w" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px" src="http://example.com/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
      </div>`
      );
    });

    it('does not properly handle URLs that contain a comma', () => {
      const html = `<div>
        <picture><source media="(min-width: 768px)" srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_280,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_560,c_limit/181022_a22232.jpg 2x"/><source srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg, https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,c_limit/181022_a22232.jpg 2x"/><img src="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg" /></picture>
      </div>`;
      const $ = cheerio.load(html);
      const $content = $('*').first();

      const result = $.html(makeLinksAbsolute($content, $, 'http://example.com'));

      assert.equal(
        result,
        `<div>
        <picture><source media="(min-width: 768px)" srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_280,http://example.com/c_limit/181022_a22232.jpg,https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_560,http://example.com/c_limit/181022_a22232.jpg 2x"><source srcset="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,http://example.com/c_limit/181022_a22232.jpg,https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_1454,http://example.com/c_limit/181022_a22232.jpg 2x"><img src="https://media.newyorker.com/cartoons/5bbfca021e40b62d6cc418ea/master/w_727,c_limit/181022_a22232.jpg"></picture>
      </div>`
      );
    });
  });
});
