// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const NewYorkerExtractor = {
  domain: 'www.newyorker.com',
  title: {
    selectors: ['h1.title'],
  },

  author: {
    selectors: ['.contributors'],
  },

  content: {
    selectors: ['div#articleBody', 'div.articleBody'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['time[itemProp="datePublished"]', 'content'],
    ],

    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: ['.dek', 'h2.dek'],
  },

  next_page_url: null,

  excerpt: null,
};
