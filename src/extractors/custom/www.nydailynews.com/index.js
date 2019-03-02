export const WwwNydailynewsComExtractor = {
  domain: 'www.nydailynews.com',

  title: {
    selectors: ['h1#ra-headline'],
  },

  author: {
    selectors: [['meta[name="parsely-author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="sailthru.date"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article#ra-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['dl#ra-tags', '.ra-related', 'a.ra-editor', 'dl#ra-share-bottom'],
  },
};
