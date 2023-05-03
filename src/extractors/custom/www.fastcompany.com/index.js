export const WwwFastcompanyComExtractor = {
  domain: 'www.fastcompany.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['.post__deck'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.post__article'],
  },
};
