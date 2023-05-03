export const ThefederalistpapersOrgExtractor = {
  domain: 'thefederalistpapers.org',

  title: {
    selectors: ['h1.entry-title'],
  },

  author: {
    selectors: ['.author-meta-title', 'main span.entry-author-name'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'header',
      '.article-sharing',
      '.after-article',
      '.type-commenting',
      '.more-posts',
      ['p[style]'],
    ],
  },
};
