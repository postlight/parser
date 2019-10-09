export const TimesofindiaIndiatimesComExtractor = {
  domain: 'timesofindia.indiatimes.com',

  title: {
    selectors: ['h1'],
  },

  extend: {
    reporter: {
      selectors: ['div.byline'],
      transforms: {},
    },
  },

  date_published: {
    selectors: ['.byline'],
    format: 'MMM D, YYYY, HH:mm z',
    timezone: 'Asia/Kolkata',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.contentwrapper:has(section)'],
    defaultCleaner: false,

    transforms: {
      section: function remove_section($node) {
        $node.empty();
        return $node;
      },
      h1: function remove_header1($node) {
        $node.empty();
        return $node;
      },
      '.byline': function remove_byline($node) {
        $node.empty();
        return $node;
      },
      '.img_cptn': function remove_img_cptn($node) {
        $node.empty();
        return $node;
      },
    },
  },
};
