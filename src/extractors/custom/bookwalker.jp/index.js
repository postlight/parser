export const BookwalkerJpExtractor = {
  domain: 'bookwalker.jp',

  title: {
    selectors: ['h1.p-main__title', 'h1.main-heading'],
  },

  author: {
    selectors: ['div.p-author__list', 'div.authors'],
  },

  date_published: {
    selectors: [
      'dl.p-information__data dd:nth-of-type(7)',
      '.work-info .work-detail:first-of-type .work-detail-contents:last-of-type',
    ],
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      'div.p-main__information',
      ['div.main-info', 'div.main-cover-inner'],
    ],

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
