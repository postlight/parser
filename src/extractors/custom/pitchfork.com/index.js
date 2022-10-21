export const PitchforkComExtractor = {
  domain: 'pitchfork.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], 'title'],
  },

  author: {
    selectors: [
      ['meta[name="article:author"]', 'value'],
      '.authors-detail__display-name',
    ],
  },

  date_published: {
    selectors: ['div[class^="InfoSliceWrapper-"]', ['.pub-date', 'datetime']],
  },

  dek: {
    selectors: [
      ['meta[name="og:description"]', 'value'],
      '.review-detail__abstract',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
      ['.single-album-tombstone__art img', 'src'],
    ],
  },

  content: {
    selectors: ['div.body__inner-container', '.review-detail__text'],
  },

  extend: {
    score: {
      selectors: ['p[class*="Rating"]', '.score'],
    },
  },
};
