export const NewrepublicComExtractor = {
  domain: 'newrepublic.com',

  title: {
    selectors: ['h1.article-headline'],
  },

  author: {
    selectors: ['span.AuthorList'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['h2.article-subhead'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['div.article-body']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['aside'],
  },
};
