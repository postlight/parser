export const WwwTodayComExtractor = {
  domain: 'www.today.com',

  title: {
    selectors: ['h1.article-hero-headline__htag', 'h1.entry-headline'],
  },

  author: {
    selectors: ['span.byline-name', ['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: ['time[datetime]', ['meta[name="DC.date.issued"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article-body__content', '.entry-container'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.label-comment'],
  },
};
