export const PitchforkComExtractor = {
  domain: 'pitchfork.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['.authors-detail__display-name'],
  },

  date_published: {
    selectors: [['.pub-date', 'datetime']],
  },

  dek: {
    selectors: ['.review-detail__abstract'],
  },

  lead_image_url: {
    selectors: [['.single-album-tombstone__art img', 'src']],
  },

  content: {
    selectors: ['.review-detail__text'],
  },

  extend: {
    score: {
      selectors: ['.score'],
    },
  },
};
