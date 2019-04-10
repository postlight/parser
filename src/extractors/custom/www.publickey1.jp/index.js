export const WwwPublickey1JpExtractor = {
  domain: 'www.publickey1.jp',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['#subcol p:has(img)'],
  },

  date_published: null,

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#maincol'],

    defaultCleaner: false,

    transforms: {},

    clean: ['#breadcrumbs', 'div.sbm', 'div.ad_footer'],
  },
};
