export const WwwInvestmentexecutiveComExtractor = {
  domain: 'www.investmentexecutive.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['div[itemprop="author"]'],
  },

  date_published: {
    selectors: [['meta[itemprop="datePublished"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['section.article-body'],

    clean: ['.hidden'],
  },
};
