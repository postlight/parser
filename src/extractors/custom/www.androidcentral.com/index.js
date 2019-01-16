export const WwwAndroidcentralComExtractor = {
  domain: 'www.androidcentral.com',

  title: {
    selectors: ['h1', 'h1.main-title'],
  },

  author: {
    selectors: ['.meta-by'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['.image-large', 'src']],
  },

  content: {
    selectors: ['.article-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.intro', 'blockquote'],
  },
};
