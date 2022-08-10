export const SpektrumExtractor = {
  domain: 'www.spektrum.de',

  title: {
    selectors: ['.content__title'],
  },

  author: {
    selectors: ['.content__author__info__name'],
  },

  date_published: {
    selectors: ['.content__meta__date'],
    timezone: 'Europe/Berlin',
  },

  dek: {
    selectors: ['.content__intro'],
  },

  lead_image_url: {
    selectors: [
      // This is how the meta tag appears in the original source code.
      ['meta[name="og:image"]', 'value'],
      // This is how the meta tag appears in the DOM in Chrome.
      // The selector is included here to make the code work within the browser as well.
      ['meta[property="og:image"]', 'content'],
      // This is the image that is shown on the page.
      // It can be slightly cropped compared to the original in the meta tag.
      '.image__article__top img',
    ],
  },

  content: {
    selectors: ['article.content'],
    clean: [
      '.breadcrumbs',
      '.hide-for-print',
      'aside',
      'header h2',
      '.image__article__top',
      '.content__author',
      '.copyright',
      '.callout-box',
    ],
  },
};
