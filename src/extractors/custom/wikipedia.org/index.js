const WikipediaExtractor = {
  domain: 'wikipedia.org',
  content: {
    selectors: [
      '#mw-content-text',
    ],

    defaultCleaner: false,

    // transform top infobox to an image with caption
    transforms: {
      '.infobox img': ($node) => {
        $node.parents('.infobox').prepend($node);
      },
      '.infobox caption': 'figcaption',
      '.infobox': 'figure',
    },

    // Selectors to remove from the extracted content
    clean: [
      '.mw-editsection',
      'figure tr, figure td, figure tbody',
      '#toc',
    ],

  },

  author: 'Wikipedia Contributors',

  title: {
    selectors: [
      'h2.title',
    ],
  },

  date_published: {
    selectors: [
      '#footer-info-lastmod',
    ],
  },

};

export default WikipediaExtractor;
