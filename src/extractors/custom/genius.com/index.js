export const GeniusComExtractor = {
  domain: 'genius.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['h2 a'],
  },

  date_published: {
    selectors: [
      [
        'meta[itemprop=page_data]',
        'value',
        res => {
          const json = JSON.parse(res);
          return json.song.release_date;
        },
      ],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      [
        'meta[itemprop=page_data]',
        'value',
        res => {
          const json = JSON.parse(res);
          return json.song.album.cover_art_url;
        },
      ],
    ],
  },

  content: {
    selectors: ['.lyrics'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
