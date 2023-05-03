export const WwwCbssportsComExtractor = {
  domain: 'www.cbssports.com',

  title: {
    selectors: ['.Article-headline', '.article-headline'],
  },

  author: {
    selectors: ['.ArticleAuthor-nameText', '.author-name'],
  },

  date_published: {
    selectors: [['meta[itemprop="datePublished"]', 'value']],
    timezone: 'UTC',
  },

  dek: {
    selectors: ['.Article-subline', '.article-subline'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
