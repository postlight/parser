export const SimpledesktopsComExtractor = {
  domain: 'simpledesktops.com',

  title: {
    selectors: ['h2 a'],
  },

  author: {
    selectors: ['.creator a'],
  },

  content: {
    selectors: [['.edge .desktop a img']],
  },
};
