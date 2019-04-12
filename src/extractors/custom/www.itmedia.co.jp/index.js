export const WwwItmediaCoJpExtractor = {
  domain: 'www.itmedia.co.jp',

  supportedDomains: [
    'www.atmarkit.co.jp',
    'techtarget.itmedia.co.jp',
    'nlab.itmedia.co.jp',
  ],

  title: {
    selectors: ['#cmsTitle h1'],
  },

  author: {
    selectors: ['#byline'],
  },

  date_published: {
    selectors: [['meta[name="article:modified_time"]', 'value']],
  },

  dek: {
    selectors: ['#cmsAbstract h2'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#cmsBody'],

    defaultCleaner: false,

    transforms: {},

    clean: ['#snsSharebox'],
  },
};
