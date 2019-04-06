export const WwwItmediaCoJpExtractor = {
  domain: 'www.itmedia.co.jp',

  supportedDomains: ['www.atmarkit.co.jp', 'techtarget.itmedia.co.jp'],

  title: {
    selectors: ['#cmsTitle div.inner h1'],
  },

  author: {
    selectors: ['div#byline.inner'],
  },

  date_published: {
    selectors: [['meta[name="article:modified_time"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#cmsBody div.inner'],

    defaultCleaner: false,

    transforms: {},

    clean: ['#snsSharebox'],
  },
};
