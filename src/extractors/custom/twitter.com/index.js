export const TwitterExtractor = {
  domain: 'twitter.com',

  content: {
    transforms: {
      // We're transforming essentially the whole page here.
      // Twitter doesn't have nice selectors, so our initial
      // selector grabs the whole page, then we're re-writing
      // it to fit our needs before we clean it up.
      '.permalink[role=main]': ($node, $) => {
        const tweets = $node.find('.tweet');
        const $tweetContainer = $('<div id="TWEETS_GO_HERE"></div>');
        $tweetContainer.append(tweets);
        $node.replaceWith($tweetContainer);
      },

      // Twitter wraps @ with s, which
      // renders as a strikethrough
      s: 'span',
    },

    selectors: ['.permalink[role=main]'],

    defaultCleaner: false,

    clean: ['.stream-item-footer', 'button', '.tweet-details-fixer'],
  },

  author: {
    selectors: ['.tweet.permalink-tweet .username'],
  },

  date_published: {
    selectors: [['.permalink-tweet ._timestamp[data-time-ms]', 'data-time-ms']],
  },
};
