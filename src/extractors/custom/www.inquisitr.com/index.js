export const WwwInquisitrComExtractor = {
  domain: 'www.inquisitr.com',

  title: {
    selectors: ['h1.entry-title.story--header--title'],
  },

  author: {
    selectors: ['div.story--header--author'],
  },

  date_published: {
    selectors: [['meta[name="datePublished"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article.story', '.entry-content.'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.post-category',
      '.story--header--socials',
      '.story--header--content',
    ],
  },
};
