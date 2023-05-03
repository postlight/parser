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
    format: 'YYYY-MM-DD|HH[h]mm',
    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['div.lead-container', '.bunker-component.lead'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      'section.document-content-style',
      ['.main-multimedia-item', '.news-story-content'],
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
