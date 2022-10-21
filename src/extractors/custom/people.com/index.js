export const PeopleComExtractor = {
  domain: 'people.com',

  title: {
    selectors: ['.article-header h1', ['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [['meta[name="sailthru.author"]', 'value'], 'a.author.url.fn'],
  },

  date_published: {
    selectors: [
      '.mntl-attribution__item-date',
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: ['.article-header h2'],
  },

  content: {
    selectors: ['div[class^="loc article-content"]', 'div.article-body__inner'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
