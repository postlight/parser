export const WwwLemondeFrExtractor = {
  domain: 'www.lemonde.fr',

  title: {
    selectors: ['h1.article__title'],
  },

  author: {
    selectors: ['.author__name'],
  },

  date_published: {
    selectors: [['meta[name="og:article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['.article__desc'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article__content'],

    transforms: {},

    clean: [],
  },
};
