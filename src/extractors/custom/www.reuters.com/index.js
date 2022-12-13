export const WwwReutersComExtractor = {
  domain: 'www.reuters.com',

  title: {
    selectors: ['h1[class*="ArticleHeader-headline-"]', 'h1.article-headline'],
  },

  author: {
    selectors: [['meta[name="og:article:author"]', 'value'], '.author'],
  },

  date_published: {
    selectors: [['meta[name="og:article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.ArticleBodyWrapper', '#article-text'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.article-subtitle': 'h4',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'div[class^="ArticleBody-byline-container-"]',
      '#article-byline .author',
    ],
  },
};
