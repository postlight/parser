export const WwwQdailyComExtractor = {
  domain: 'www.qdaily.com',

  title: {
    selectors: ['h2', 'h2.title'],
  },

  author: {
    selectors: ['.name'],
  },

  date_published: {
    selectors: [['.date.smart-date', 'data-origindate']],
  },

  dek: {
    selectors: ['.excerpt'],
  },

  lead_image_url: {
    selectors: [['.article-detail-hd img', 'src']],
  },

  content: {
    selectors: ['.detail'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.lazyload', '.lazylad', '.lazylood'],
  },
};
