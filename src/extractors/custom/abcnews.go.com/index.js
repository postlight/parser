export const AbcnewsGoComExtractor = {
  domain: 'abcnews.go.com',

  title: {
    selectors: [
      'header.article-header h1',
    ],
  },

  author: {
    selectors: [
      'ul.authors',
    ],
  },

  date_published: {
    selectors: [
      'span.timestamp',
    ],
    timezone: 'America/New_York',

  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.article-copy',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
