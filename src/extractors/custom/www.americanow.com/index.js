export const WwwAmericanowComExtractor = {
  domain: 'www.americanow.com',

  title: {
    selectors: ['.title', ['meta[name="title"]', 'value']],
  },

  author: {
    selectors: ['.byline'],
  },

  date_published: {
    selectors: [['meta[name="publish_date"]', 'value']],
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
    selectors: [['.article-content', '.image', '.body'], '.body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.article-video-wrapper', '.show-for-small-only'],
  },
};
