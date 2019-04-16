export const BookwalkerJpExtractor = {
  domain: 'bookwalker.jp',

  title: {
    selectors: ['h1.main-heading'],
  },

  author: {
    selectors: ['div.authors'],
  },

  date_published: {
    selectors: [
      '.work-info .work-detail:first-of-type .work-detail-contents:last-of-type',
    ],
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['div.main-info', 'div.main-cover-inner']],

    defaultCleaner: false,

    transforms: {},

    clean: [
      'span.label.label--trial',
      'dt.info-head.info-head--coin',
      'dd.info-contents.info-contents--coin',
      'div.info-notice.fn-toggleClass',
    ],
  },
};
