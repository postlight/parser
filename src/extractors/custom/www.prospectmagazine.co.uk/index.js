export const WwwProspectmagazineCoUkExtractor = {
  domain: 'www.prospectmagazine.co.uk',

  title: {
    selectors: ['.blog-header__title', '.page-title'],
  },

  author: {
    selectors: ['.blog-header__author-link', '.aside_author .title'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value'], '.post-info'],

    timezone: 'Europe/London',
  },

  dek: {
    selectors: ['.blog-header__description', '.page-subtitle'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.blog__container', 'article .post_content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
