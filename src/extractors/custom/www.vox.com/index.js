export const WwwVoxComExtractor = {
  domain: 'www.vox.com',

  title: {
    selectors: ['h1.c-page-title'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['.p-dek'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['figure.e-image--hero', '.c-entry-content'],
      '.c-entry-content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'figure .e-image__image noscript': $node => {
        const imgHtml = $node.html();
        $node
          .parents('.e-image__image')
          .find('.c-dynamic-image')
          .replaceWith(imgHtml);
      },

      'figure .e-image__meta': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
