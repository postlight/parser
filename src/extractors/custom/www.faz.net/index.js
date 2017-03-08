export const WwwFazNetExtractor = {
  domain: 'www.faz.net',

  title: {
    selectors: [
      ['meta[name="og:title"]', 'value'],
    ],
  },

  author: {
    selectors: [
      '.Content.Autor',
    ],
  },

  date_published: {
    selectors: [
      '.Datum',
    ],
  },

  dek: {
    selectors: [
      'p[itemprop=description]',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  next_page_url: {
    selectors: [
      ['link[rel=next]', 'href'],
    ],
  },

  content: {
    selectors: [
      'div[itemprop=articleBody]',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
