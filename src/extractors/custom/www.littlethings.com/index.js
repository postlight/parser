// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const LittleThingsExtractor = {
  domain: 'www.littlethings.com',
  title: {
    selectors: [
      'h1.post-title',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      // enter content selectors
      '.mainContentIntro',
      '.content-wrapper',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  next_page_url: null,

  excerpt: null,
};
