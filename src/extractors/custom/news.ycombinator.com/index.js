export const HackerNewsExtractor = {
  domain: 'news.ycombinator.com',

  title: {
    selectors: ['td.title > span > a'],
  },

  author: {
    selectors: ['td.subtext > span > a.hnuser'],
  },

  // date_published: {
  //   selectors: [''],
  // },

  content: {
    selectors: ['div.toptext'],
  },

  extend: {
    comments: {
      selectors: ['div.comment span.commtext'],
      allowMultiple: true,
    },
  },
};
