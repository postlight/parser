export const WwwLadbibleComExtractor = {
  domain: 'www.ladbible.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['[class*=Byline]'],
  },

  date_published: {
    selectors: ['time'],
    timezone: 'Europe/London',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['[class*=ArticleContainer]'],
    clean: [
      'time',
      'source',
      'a[href^="https://www.ladbible.com/"]',
      'picture',
      '[class*=StyledCardBlock]',
    ],
  },
};
