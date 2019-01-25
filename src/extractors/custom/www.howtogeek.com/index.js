export const WwwHowtogeekComExtractor = {
  domain: 'www.howtogeek.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['#authorinfobox a'],
  },

  date_published: {
    selectors: ['#authorinfobox + div li'],
    timezone: 'GMT',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.thecontent'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
