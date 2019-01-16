export const twofortysevensportsComExtractor = {
  domain: '247sports.com',

  title: {
    selectors: ['title', 'article header h1'],
  },

  author: {
    selectors: ['.author'],
  },

  date_published: {
    selectors: [['time[data-published]', 'data-published']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['section.body.article'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
