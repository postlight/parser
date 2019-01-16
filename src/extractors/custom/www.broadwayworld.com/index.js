// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const BroadwayWorldExtractor = {
  domain: 'www.broadwayworld.com',
  title: {
    selectors: ['h1.article-title'],
  },

  author: {
    selectors: ['span[itemprop=author]'],
  },

  content: {
    selectors: ['div[itemprop=articlebody]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  date_published: {
    selectors: [['meta[itemprop=datePublished]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  next_page_url: {
    selectors: [
      // enter selectors
    ],
  },

  excerpt: {
    selectors: [
      // enter selectors
    ],
  },
};
