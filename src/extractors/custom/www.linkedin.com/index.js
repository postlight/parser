export const WwwLinkedinComExtractor = {
  domain: 'www.linkedin.com',

  title: {
    selectors: ['.article-title', 'h1'],
  },

  author: {
    selectors: [
      '.main-author-card h3',
      ['meta[name="article:author"]', 'value'],
      '.entity-name a[rel=author]',
    ],
  },

  date_published: {
    selectors: [
      '.base-main-card__metadata',
      ['time[itemprop="datePublished"]', 'datetime'],
    ],

    timezone: 'America/Los_Angeles',
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      '.article-content__body',
      ['header figure', '.prose'],
      '.prose',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.entity-image'],
  },
};
