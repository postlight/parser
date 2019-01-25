export const ThoughtcatalogComExtractor = {
  domain: 'thoughtcatalog.com',

  title: {
    selectors: ['h1.title', ['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [
      'div.col-xs-12.article_header div.writer-container.writer-container-inline.writer-no-avatar h4.writer-name',
      'h1.writer-name',
    ],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.entry.post'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.tc_mark'],
  },
};
