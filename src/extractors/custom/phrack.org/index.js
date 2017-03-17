export const PhrackOrgExtractor = {
  domain: 'phrack.org',

  title: {
    selectors: [
      '.p-title',
    ],
  },

  author: {
    selectors: [
      '.opt-bottom',
    ],
    
    clean: [
      'strong',
    ],
  },

  date_published: {
    selectors: [
      '.around',
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      // enter selectors
    ],
  },

  content: {
    selectors: [
      'pre',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
