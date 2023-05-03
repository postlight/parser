export const WwwOpposingviewsComExtractor = {
  domain: 'www.opposingviews.com',

  title: {
    selectors: ['h1.m-detail-header--title', 'h1.title'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value'], 'div.date span span a'],
  },

  date_published: {
    selectors: [
      ['meta[name="published"]', 'value'],
      ['meta[name="publish_date"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.m-detail--body', '.article-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.show-for-small-only'],
  },
};
