export const WwwNprOrgExtractor = {
  domain: 'www.npr.org',

  title: {
    selectors: [
      'div.storytitle h1',
    ],
  },

  author: {
    selectors: [
      'p.byline__name.byline__name--block',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="date"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.storytext',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'div.enlarge_measure',
    ],
  },
};
