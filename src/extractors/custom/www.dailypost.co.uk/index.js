export const WwwDailypostCoUkExtractor = {
  domain: 'www.dailypost.co.uk',

  title: { selectors: ['h1', [['meta[name="og:title"]', 'value']]] },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: [
      ['meta[name="description"]', 'content'],
      ['meta[name="description"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="twitter:image"]', 'value']],
  },

  content: {
    selectors: ['div[class="article-body"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    // 'data-embed-group="read-more"', 'class="read-more-links"'
    clean: [],
  },
};
