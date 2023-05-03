export const HellogigglesComExtractor = {
  domain: 'hellogiggles.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], '.title'],
  },

  author: {
    selectors: ['.byline-wrapper span.author_name', '.author-link'],
  },

  date_published: {
    selectors: [
      ['meta[property="article:published_time"]', 'content'],
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.main-content', '.entry-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
