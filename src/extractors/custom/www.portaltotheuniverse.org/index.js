export const WwwPortaltotheuniverseOrgExtractor = {
  domain: 'www.portaltotheuniverse.org',

  title: {
    selectors: ['h2 a'],
  },

  date_published: {
    selectors: ['.headerclock'],
  },

  content: {
    defaultCleaner: false,
    selectors: ['#maincolumn .box-inside'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      // Convert h2 elements to paragraphs -- mostly to prevent them from being
      // removed, but also because they do not look like headers in the site.
      h2: 'p',

      // Create figure elements with elements and their corresponding .caption elements.
      '.caption': $node => {
        const previous = $node.prev();
        previous.remove();
        $node.replaceWith(
          `<figure>${previous}<figcaption>${$node}</figcaption>`
        );
      },

      // Subscribe to iTunes links should be paragraphs.
      'span:has(a[href^="itpc:"])': () => {
        return 'p';
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.no-gap-top img',
      '.date',
      '#feature_player_content',
      'img[src*="video.png"]',
      'img[src*="audio.png"]',
    ],
  },
};
