export const WwwTheguardianComExtractor = {
  domain: 'www.theguardian.com',

  title: {
    selectors: ['h1', '.content__headline'],
  },

  author: {
    selectors: ['address[data-link-name="byline"]', 'p.byline'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['div[data-gu-name="standfirst"]', '.content__standfirst'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#maincontent', '.content__article-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.hide-on-mobile', '.inline-icon'],
  },
};
