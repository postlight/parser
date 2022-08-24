export const Www163ComExtractor = {
  domain: 'www.163.com',

  title: {
    selectors: [['meta[property="og:title"]', 'content'], '.post_title'],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'content'],
      ['meta[property="article:author"]', 'content'],
      '.post_author',
    ],
  },

  date_published: {
    selectors: [['meta[property="article:published_time"]', 'content']],
  },

  dek: {
    selectors: [],
  },

  lead_image_url: {
    selectors: ['p.f_center img'],
  },

  content: {
    selectors: ['.post_body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
