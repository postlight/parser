export const PitchforkComExtractor = {
  domain: 'pitchfork.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['.authors-detail__display-name'],
  },

  date_published: {
    selectors: ['.pub-date'],
  },

  dek: {
    selectors: ['.review-detail__abstract'],
  },

  lead_image_url: {
    selectors: [['.single-album-tombstone__art img', 'src']],
  },

  content: {
    selectors: ['.review-detail__text'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
