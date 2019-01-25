// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const MSNExtractor = {
  domain: 'www.msn.com',
  title: {
    selectors: [
      'h1',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      'span.authorname-txt',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      'div.richtext',
      // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['span.caption'],
  },

  date_published: {
    selectors: ['span.time'],
  },

  lead_image_url: {
    selectors: [],
  },

  dek: {
    selectors: [],
  },

  next_page_url: null,

  excerpt: null,
};
