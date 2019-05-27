export const WwwJnsaOrgExtractor = {
  domain: 'www.jnsa.org',

  title: {
    selectors: ['#wgtitle h2'],
  },

  author: null,

  date_published: null,

  dek: null,

  excerpt: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#main_area'],

    transforms: {},

    clean: ['#pankuzu', '#side'],
  },
};
