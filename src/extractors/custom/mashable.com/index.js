export const MashableComExtractor = {
  domain: 'mashable.com',

  title: {
    selectors: ['header h1', 'h1.title'],
  },

  author: {
    selectors: [['meta[name="article:author"]', 'value'], 'span.author_name a'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#article', 'section.article-content.blueprint'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.image-credit': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
