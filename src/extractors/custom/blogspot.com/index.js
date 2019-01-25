export const BloggerExtractor = {
  domain: 'blogspot.com',
  content: {
    // Blogger is insane and does not load its content
    // initially in the page, but it's all there
    // in noscript
    selectors: ['.post-content noscript'],

    // Selectors to remove from the extracted content
    clean: [],

    // Convert the noscript tag to a div
    transforms: {
      noscript: 'div',
    },
  },

  author: {
    selectors: ['.post-author-name'],
  },

  title: {
    selectors: ['.post h2.title'],
  },

  date_published: {
    selectors: ['span.publishdate'],
  },
};
