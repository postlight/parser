export const NewrepublicComExtractor = {
  domain: 'newrepublic.com',

  title: {
    selectors: [
      'h1.article-headline',
    ],
  },

  author: {
    selectors: [
      'div.author-list',
    ],
  },

  date_published: {
    selectors: [
      ['meta[property="article:published_time"]', 'content'],
    ],
  },

  dek: {
    selectors: [
      'h2.article-subhead',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[property="og:image"]', 'content'],
    ],
  },

  content: {
    selectors: [
      'div.content-body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
