export const MarblegateWebcomicWsExtractor = {
  domain: 'marblegate.webcomic.ws',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['#authornotes .authordata a'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['#comicimagewrap']],
  },
};
