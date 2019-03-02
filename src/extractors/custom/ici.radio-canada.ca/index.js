export const IciRadioCanadaCaExtractor = {
  domain: 'ici.radio-canada.ca',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [['meta[name="dc.creator"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="dc.date.created"]', 'value']],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['.bunker-component.lead'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['.main-multimedia-item', '.news-story-content']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
