export const InagblogComExtractor = {
  domain: 'inagblog.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,
    selectors: [['#post-content']],
    clean: [['.ssba']],
  },
};
