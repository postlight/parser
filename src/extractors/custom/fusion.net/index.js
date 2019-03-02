export const FusionNetExtractor = {
  domain: 'fusion.net',

  title: {
    selectors: ['.post-title', '.single-title', '.headline'],
  },

  author: {
    selectors: ['.show-for-medium .byline'],
  },

  date_published: {
    selectors: [['time.local-time', 'datetime']],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['.post-featured-media', '.article-content'],
      '.article-content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.fusion-youtube-oembed': 'figure',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
