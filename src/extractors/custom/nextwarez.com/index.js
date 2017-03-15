export const NextwarezComExtractor = {
  domain: 'nextwarez.com',

  title: {
    selectors: [
      'h1',
      'h1.post-title',
    ],
  },

  author: {
    selectors: [
      '.reviewer',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      ['.post-content.description p', 'h5', 'h2', 'h3'],
      ['div[itemProp="articleBody"]'],
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      img: ($node) => {
        const lazyImage = $node.attr('data-lazy-src');
        $node.replaceWith(`<img src="${lazyImage}" />`);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.review-box',
      '.tagcloud',
      'h2 a',
    ],
  },
};
