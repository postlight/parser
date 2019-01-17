// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const YahooExtractor = {
  domain: 'www.yahoo.com',
  title: {
    selectors: [
      'header.canvas-header',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      'span.provider-name',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      // enter content selectors
      '.content-canvas',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.figure-caption'],
  },

  date_published: {
    selectors: [['time.date[datetime]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [
      // enter dek selectors
    ],
  },

  next_page_url: null,

  excerpt: null,
};
