// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const WiredExtractor = {
  domain: 'www.wired.com',
  title: {
    selectors: [
      'h1[data-testId="ContentHeaderHed"]',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      ['meta[name="article:author"]', 'value'],
      'a[rel="author"]',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      'article.article.main-content',
      'article.content',
      // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.visually-hidden', 'figcaption img.photo', '.alert-message'],
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
