// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const PoliticoExtractor = {
  domain: 'www.politico.com',
  title: {
    selectors: [
      // enter title selectors
      ['meta[name="og:title"]', 'value'],
    ],
  },

  author: {
    selectors: [
      '.story-meta__authors .vcard',
      '.story-main-content .byline .vcard',
    ],
  },

  content: {
    selectors: [
      // enter content selectors
      ['p.story-text__paragraph   '],
      '.story-main-content',
      '.content-group',
      '.story-core',
      '.story-text',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['figcaption'],
  },

  date_published: {
    selectors: [
      '.story-meta__details time[datetime]',
      ['.story-main-content .timestamp time[datetime]', 'datetime'],
    ],
  },

  lead_image_url: {
    selectors: [
      // enter lead_image_url selectors
      ['meta[name="og:image"]', 'value'],
    ],
  },

  dek: {
    selectors: [],
  },

  next_page_url: null,

  excerpt: null,
};
