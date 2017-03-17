export const SecondavenuesagasComExtractor = {
  domain: 'secondavenuesagas.com',

  title: {
    selectors: [
      ['meta[name="og:title"]', 'value'],
    ],
  },

  author: {
    selectors: [
      '.meta-author',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      ['meta[name="og:description"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.post',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.st_facebook_hcount',
      '.st_twitter_hcount',
      '.st_email_hcount',
      '.st_plusone_hcount',
      '.st_pinterest_hcount',
    ],
  },
};
