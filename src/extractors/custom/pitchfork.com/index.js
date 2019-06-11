export const PitchforkComExtractor = {
  domain: 'pitchfork.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['.authors-detail__display-name'],
  },

  date_published: {
    selectors: ['.pub-date'],
  },

  dek: {
    selectors: ['.review-detail__abstract'],
  },

  lead_image_url: {
    selectors: [['.single-album-tombstone__art img', 'src']],
  },

  content: {
    // get both the album's score and the review text
    selectors: [['.score', '.review-detail__text']],

    transforms: {
      // convert the score, which is just a number, to a sentence. for example,
      // 6.2 returns "Score: 6.2. ", so that it will appear as the first
      // sentence in the review.
      span: $node => {
        if ($node.attr('class') === 'score') {
          const score = $node.text();
          $node.text(`Score: ${score}. `);
        }
      },
    },

    clean: [],
  },
};
