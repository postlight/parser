export const WwwPilzforumAtExtractor = {
  domain: 'www.pilzforum.at',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['div.author_information strong span'],
  },

  date_published: {
    selectors: [['.post_date span', 'title']],
  },

  content: {
    // :first-of-type, because I want just the first post, not the replies.
    selectors: [['.post:first-of-type .post_content']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.post_head'],
  },
};
