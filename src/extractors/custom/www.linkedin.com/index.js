export const WwwLinkedinComExtractor = {
  domain: 'www.linkedin.com',

  title: {
    selectors: [
      'h1.article-title',
    ],
  },

  author: {
    selectors: [
      '.article-header .name',
    ],
  },

  date_published: {
    selectors: [
      ['time.pub-date', 'datetime'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
      ['img.cover-image', 'src'],
    ],
  },

  content: {
    selectors: [
      'div.article-body',
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
