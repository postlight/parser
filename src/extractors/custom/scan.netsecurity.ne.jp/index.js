export const ScanNetsecurityNeJpExtractor = {
  domain: 'scan.netsecurity.ne.jp',

  title: {
    selectors: ['header.arti-header h1.head'],
  },

  author: null,

  date_published: {
    selectors: [['meta[name="article:modified_time"]', 'value']],
  },

  dek: {
    selectors: ['header.arti-header p.arti-summary'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.arti-content.arti-content--thumbnail'],

    defaultCleaner: false,

    transforms: {},

    clean: ['aside.arti-giga'],
  },
};
