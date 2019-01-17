export const WwwThepennyhoarderComExtractor = {
  domain: 'www.thepennyhoarder.com',

  title: {
    selectors: [['meta[name="dcterms.title"]', 'value']],
  },

  author: {
    selectors: [['link[rel="author"]', 'title']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['.post-img', '.post-text'], '.post-text'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
