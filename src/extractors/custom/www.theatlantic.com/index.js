// Rename CustomExtractor
// to fit your publication
export const TheAtlanticExtractor = {
  domain: 'www.theatlantic.com',
  title: {
    selectors: ['h1.hed'],
  },

  author: {
    selectors: ['article#article .article-cover-extra .metadata .byline a'],
  },

  content: {
    selectors: [
      ['.article-cover figure.lead-img', '.article-body'],
      '.article-body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.partner-box', '.callout'],
  },

  date_published: {
    selectors: [['time[itemProp="datePublished"]', 'datetime']],
  },

  lead_image_url: null,

  next_page_url: null,

  excerpt: null,
};
