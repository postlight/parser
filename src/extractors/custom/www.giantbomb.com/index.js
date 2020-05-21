export const WwwGiantbombComExtractor = {
  domain: 'www.giantbomb.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  author: {
    selectors: ['*[rel="author"]'],
  },

  date_published: {
    selectors: ['time[pubdate]'],
  },

  dek: {
    selectors: ['.news-deck'],
  },

  content: {
    defaultCleaner: false,
    selectors: ['.episode-content-section', '.js-content-entity-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '*[data-video]': $node => {
        const att = JSON.parse($node.attr('data-video'));
        $node.replaceWith(
          `<video src="${
            att.videoStreams.adaptive_stream
          }" width="640" height="360" controls preload="false">`
        );
      },
      h3: $node => {
        $node.before('<p></p>');
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.js-dropdown--main dropdown--main',
      '.av-clip-controls-section',
      '.follow',
      '.hover-play-icon ',
      '.hover-pause-icon',
      '.show-episode-buttons',
      '.av-clip-container',
    ],
  },
};
