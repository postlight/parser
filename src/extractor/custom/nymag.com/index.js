const NYMagExtractor = {
  domain: 'nymag.com',
  content: {
    // Order by most likely. Extractor will stop on first occurence
    selectors: [
      'div.article-content',
      'section.body',
      'article.article',
    ],

    // Selectors to remove from the extracted content
    clean: [
      '.ad',
      '.single-related-story',
    ],

    // Array of tranformations to make on matched elements
    // Each item in the array is an object. They key is the
    // selector, the value is a tranformation function
    // for the matching node.
    transforms: [
      // Convert h1s to h2s
      {
        'h1': 'h2'
      },

      // Convert lazy-loaded noscript images to figures
      {
        'noscript': ($node) => {
          const $children = $node.children()
          if ($children.length === 1 && $children.get(0).tagName === 'img') {
            return 'figure'
          }
        }
      }
    ]
  },

  title: {
    selectors: [
      'h1.headline-primary',
      'h1',
    ]
  }
}

export default NYMagExtractor
