export const WwwLiverpoolechoCoUkExtractor = {
  domain: 'www.liverpoolecho.co.uk',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['div[class="author"] span[rel="author"]'],
  },

  date_published: {
    selectors: [['time[class="date-published"]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[class="article-body"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['read-more-links', 'embedded-image-grid publication-theme-border'],
  },
};
