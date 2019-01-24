// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const WikiaExtractor = {
  domain: 'fandom.wikia.com',
  title: {
    selectors: [
      'h1.entry-title',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      '.author vcard',
      '.fn',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      '.grid-content',
      '.entry-content',
      // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  next_page_url: null,

  excerpt: null,
};
