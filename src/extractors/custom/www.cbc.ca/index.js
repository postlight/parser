export const WwwCbcCaExtractor = {
  domain: 'www.cbc.ca',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.authorText', '.bylineDetails'],
  },

  date_published: {
    selectors: [['.timeStamp[datetime]', 'datetime']],
  },

  dek: {
    selectors: ['.deck'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.story'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
