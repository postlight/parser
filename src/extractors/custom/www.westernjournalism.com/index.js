export const WwwWesternjournalismComExtractor = {
  domain: 'www.westernjournalism.com',

  title: {
    selectors: ['title', 'h1.entry-title'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="DC.date.issued"]', 'value']],
  },

  dek: {
    selectors: ['.subtitle'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article-sharing.top + div'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.ad-notice-small'],
  },
};
