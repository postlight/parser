export const WwwGrueneDeExtractor = {
  domain: 'www.gruene.de',

  title: {
    selectors: ['header h1'],
  },

  author: null,

  date_published: null,

  dek: null,

  lead_image_url: {
    selectors: [['meta[property="og:image"]', 'content']],
  },

  content: {
    // selectors: ['section'],
    selectors: [['section header', 'section h2', 'section p', 'section ol']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['figcaption', 'p[class]'],
  },
};
