export const DeadlineComExtractor = {
  domain: 'deadline.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['section.author h3'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
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
