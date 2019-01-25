export const WwwProspectmagazineCoUkExtractor = {
  domain: 'www.prospectmagazine.co.uk',

  title: {
    selectors: ['.page-title'],
  },

  author: {
    selectors: ['.aside_author .title'],
  },

  date_published: {
    selectors: ['.post-info'],

    timezone: 'Europe/London',
  },

  dek: {
    selectors: ['.page-subtitle'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article .post_content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
