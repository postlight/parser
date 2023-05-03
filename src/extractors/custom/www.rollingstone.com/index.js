export const WwwRollingstoneComExtractor = {
  domain: 'www.rollingstone.com',

  title: {
    selectors: ['h1.l-article-header__row--title', 'h1.content-title'],
  },

  author: {
    selectors: ['a.c-byline__link', 'a.content-author.tracked-offpage'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      'time.content-published-date',
    ],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['h2.l-article-header__row--lead', '.content-description'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      '.l-article-content',
      ['.lead-container', '.article-content'],
      '.article-content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.c-related-links-wrapper', '.module-related'],
  },
};
