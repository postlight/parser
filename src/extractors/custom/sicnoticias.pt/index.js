export const SicnoticiasPtExtractor = {
  domain: 'sicnoticias.pt',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [
      // enter author selectors
    ],
  },

  date_published: {
    selectors: [['meta[name="impresa:publishedDate"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,

    selectors: [['.main-media, .article-content']],
  },
};
