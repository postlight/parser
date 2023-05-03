export const WwwRawstoryComExtractor = {
  domain: 'www.rawstory.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], '.blog-title'],
  },

  author: {
    selectors: [
      'div.main-post-head .social-author__name',
      '.blog-author a:first-of-type',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      '.blog-author a:last-of-type',
    ],

    timezone: 'EST',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.post-body', '.blog-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
