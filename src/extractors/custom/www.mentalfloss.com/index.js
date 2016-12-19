export const WwwMentalflossComExtractor = {
  domain: 'www.mentalfloss.com',

  title: {
    selectors: [
      'h1.title',
      '.title-group',
      '.inner',
    ],
  },

  author: {
    selectors: [
      'div.field.field-name-field-enhanced-authors.field-type-computed.field-label-hidden',
    ],
  },

  date_published: {
    selectors: [
      '.date-display-single',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.field.field-name-body',
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
