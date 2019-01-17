export const WwwNbcnewsComExtractor = {
  domain: 'www.nbcnews.com',

  title: {
    selectors: ['div.article-hed h1'],
  },

  author: {
    selectors: ['span.byline_author'],
  },

  date_published: {
    selectors: [
      ['.flag_article-wrapper time.timestamp_article[datetime]', 'datetime'],
      '.flag_article-wrapper time',
    ],

    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
