Each extractor should ultimately be an object that exports like so:

```javascript
import GenericContentExtractor from './content/extractor'
import GenericTitleExtractor from './title/extractor'
import GenericAuthorExtractor from './author/extractor'
import GenericDatePublishedExtractor from './date-published/extractor'
import GenericDekExtractor from './dek/extractor'
import GenericLeadImageUrlExtractor from './lead-image-url/extractor'

const GenericExtractor = {
  content: GenericContentExtractor,
  title: GenericTitleExtractor,
  author: GenericAuthorExtractor,
  datePublished: GenericDatePublishedExtractor,
  dek: GenericDekExtractor,
  leadImageUrl: GenericLeadImageUrlExtractor,
}
```

Custom parsers can then be merged with the generic parser to fill in gaps in their implementations. E.g:

```javascript
import NYMagContentExtractor from '...'
import NYMagTitleExtractor from '...'

const NYMagExtractor = {
  content: NYMagContentExtractor,
  title: NYMagTitleExtractor,
}

const Extractor = {
  ...GenericExtractor,
  ...NYMagExtractor
}

```

# Declarative Custom Extractors

My goal is be to create declarative extractors that describe what rather than how. So, for example:

```javascript
NYMagExtractor = {
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
    ],

    // Array of tranformations to make on matched elements
    // Each item in the array is an object. They key is the 
    // selector, the value is a tranformation function
    // for the matching node.
    transforms: [
      // Convert h1s to h2s
      {
        'h1': ($node) => convertNodeTo($node, $, 'h2')
      },

      // Convert lazy-loaded noscript images to figures
      {
        'noscript': ($node) => {
          const $children = $node.children()
          if ($children.length === 1 && $children.get(0).tagName === 'img') {
            convertNodeTo($node, $, 'figure')
          }
        }
      }
    ]
  },

  title: [
    'h1',
  ]
}
```
