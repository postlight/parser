export const MedStanfordEduExtractor = {
  domain: 'med.stanford.edu',

  title: {
    selectors: [
      // enter title selectors
      '.news-title h1',
    ],
  },

  author: {
    selectors: [
      // enter author selectors
      "span.name[itemprop='author']",
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
      ".publication-date[itemprop='datePublished']",
    ],
  },

  dek: {
    selectors: [
      // enter selectors
      '.news-excerpt',
    ],
  },

  lead_image_url: {
    selectors: [
      // enter selectors
      ["meta[name='twitter:image']", "value"],
    ],
  },

  content: {
    selectors: [
      // enter content selectors
      '.main.parsys',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ]
  },
}
