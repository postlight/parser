export const PagesixComExtractor = {
  domain: 'pagesix.com',

  supportedDomains: [
    'nypost.com',
  ],

  title: {
    selectors: [
      'h1 a',
    ],
  },

  author: {
    selectors: [
      '.byline',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      ['meta[name="description"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.article-header',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '#featured-image-wrapper': ($node) => {
        const sourceSet = $node.find('source').first().attr('srcset');
        const largestImg = sourceSet.split(' ')[0];
        $node.replaceWith(`<img src="${largestImg}" />`);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.flag-region',
      'h1',
      '.author-byline',
      '.byline-date',
      '.double-rule',
      '.in-line-column',
      '.modal-trigger',
      '.wp-caption-text',
    ],
  },
};
