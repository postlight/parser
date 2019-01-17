export const WwwTmzComExtractor = {
  domain: 'www.tmz.com',

  title: {
    selectors: ['.post-title-breadcrumb', 'h1', '.headline'],
  },

  author: 'TMZ STAFF',

  date_published: {
    selectors: ['.article-posted-date'],

    timezone: 'America/Los_Angeles',
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
    selectors: ['.article-content', '.all-post-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.lightbox-link'],
  },
};
