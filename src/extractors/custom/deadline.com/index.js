export const DeadlineComExtractor = {
  domain: 'deadline.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['div.author__byline p a span:first-of-type'],
  },

  date_published: {
    selectors: ['time'],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.a-article-grid__main.pmc-a-grid div.pmc-a-grid-item'],

    defaultCleaner: false,

    transforms: {},

    clean: [
      'button.o-icon-button.c-button--block.pmc-u-background-brand-red',
      '#comments-loading',
    ],
  },
};
