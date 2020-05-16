export const WwwBbcComExtractor = {
  domain: 'www.bbc.com',
  supportedDomains: ['www.bbc.co.uk'],

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },
  content: {
    defaultCleaner: false,

    locator: ($, url) => {
      if (url.includes('/reel/')) {
        const image_url = $('meta[name="og:image"]').attr('value');
        const image_width = $('meta[name="og:image:width"]').attr('value');
        const image_height = $('meta[name="og:image:height"]').attr('value');
        const description = $('meta[name="description"]').attr('value');
        return `<div><img src="${image_url}" width="${image_width}" height="${image_height}"><p>${description}</p></div>`;
      }
      return null;
    },

    selectors: [
      ['.vxp-media__summary'],
      ['*[property="articleBody"]'],
      ['.hero-image, .article__body'],
      ['#lx-stream'],
      ['.story-body'],
      ['.body-content'],
    ],

    clean: [
      '.article__author-unit',
      '.article__intro',
      '.drop-capped',
      '.lx-media-asset__copyright',
      '.qa-visually-hidden-meta',
      '.qa-post-auto-meta',
      'footer',
      'button',
      '.lx-stream-post__contributor',
      'svg',
      '.lx-pagination',
      '.sp-story-body__introduction',
      '.player-with-placeholder__caption',
      '.off-screen',
      '.story-image-copyright',
      '.social-embed',
      'img[alt~="banner"]',
    ],

    transforms: {
      '.vxp-media__summary': ($node, $) => {
        const [selector, attr] = WwwBbcComExtractor.lead_image_url.selectors[0];
        const src = $(selector).attr(attr);
        if (src) {
          $node.prepend(`<img src="${src}" />`);
        }
      },
      // Lazy-loaded images.
      '.js-delayed-image-load': $node => {
        const alt = $node.attr('data-alt');
        const src = $node
          .attr('data-src')
          .replace('%7Bwidth%7D%7Bhidpi%7D', '624')
          .replace('%7Bwidth%7D', '1024');
        const width = $node.attr('data-width');
        const height = $node.attr('data-height');
        if (alt && src && width && height) {
          $node.attr('alt', alt);
          $node.attr('src', src);
          $node.attr('width', width);
          $node.attr('height', height);
          return 'img';
        }
        return null;
      },
      img: $node => {
        let src = $node.attr('src');
        if (src) {
          src = src
            .replace('%7Bwidth%7D%7Bhidpi%7D', '624')
            .replace('%7Bwidth%7D', '1024');
          $node.attr('src', src);
        }
        const srcset = $node.attr('srcset');
        if (srcset) {
          const elements = srcset.split(/,\s*/);
          const lastElement = elements[elements.length - 1];
          const lastElementComponents = lastElement.split(/\s+/);
          $node.attr('src', lastElementComponents[0]);
          $node.removeAttr('srcset');
          $node.removeAttr('sizes');
        }
        return 'img';
      },

      // Convert figures.
      '.article-body__image-text': () => {
        return 'figure';
      },
      '.article-body__image-text .inline-image__description': () => {
        return 'figcaption';
      },
      figure: $node => {
        if (
          $node.find('img').length === 0 ||
          $node.find('img[alt~="Banner"]').length !== 0 ||
          $node.find('img[alt="Newsbeat"]').length !== 0 ||
          $node.find('img[alt="Reality"]').length !== 0
        ) {
          $node.remove();
        }
      },

      // Convert lists and list items to divs in order to avoid stray bullets and numbers.
      '#lx-stream ol': () => {
        return 'div';
      },
      '#lx-stream li': () => {
        return 'div';
      },

      // Make sure h3 is not removed just because it does not have a preceding paragraph.
      h3: $node => {
        $node.before('<p></p>');
      },

      'div[data-video-player-image-url]': $node => {
        $node.attr('src', $node.attr('data-video-player-image-url'));
        return 'img';
      },
    },
  },
};
