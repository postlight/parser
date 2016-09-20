# Custom Parsers

Mercury can extract meaningful content from almost any web site, but custom parsers allow the Mercury parser to find the content more quickly and more accurately than it might otherwise do. Our goal is to include custom parsers as many sites as we can, and we'd love your help!

## How to generate a custom parser

Take a look at the live custom parsers in [`src/extractors/custom`](/src/extractors/custom) for examples and to check if the site you want to write a parser for already exists.

To generate a new custom parser, run:

```bash
npm run generate-custom-parser
```

This script will prompt you to paste a link to an article you want to parse. The URL you choose will serve as the example your parser tests against. The script will also generate your custom parser and a barebones (and failing) test for your parser.

At that point, you'll be prompted to run:

```bash
npm test
```

This will run the test for your parser, which will fail (which makes sense — you haven't written it yet!). Your goal now is to follow the instructions in the generated `<example.com>/index.test.js` and `<example.com>/index.js` files until they pass!

## How to write a custom parser

Custom parsers allow you to write CSS selectors that will find the content you're looking for on the page you're testing against. If you're familiar with jQuery, the selectors work exactly the same way.

You can query for every field returned by the Mercury Parser:

  - title
  - author
  - content
  - date_published
  - lead_image_url
  - dek
  - next_page_url
  - excerpt

### Using selectors

To demonstrate, let's start with something simple: Your selector for the page's title might look something like this:

```javascript
export const ExampleExtractor = {
    ...

    // Order by most likely. Extractor will stop on first occurrence
    title: {
      selectors: [
        'h1.hed',
      ],
    },

    ...
```

As you might guess, the selectors key provides an array of selectors that Mercury will check to find your title text. In our ExampleExtractor, we're saying that the title can be found in the text of an `h1` header with a class name of `hed`.

The selector you choose should return one element. If more than one element is returned by your selector, it will fail (and Mercury will fall back to its generic extractor).

This is all you'll need to know to handle most of the fields Mercury parses (titles, authors, date published, etc.). Article content is the exception.

### Cleaning content

An article's content can be more complex than the other fields, meaning you sometimes need to do more than just provide the selector(s) in order to return clean content.

For example, sometimes an article's content will contain related content that doesn't translate or render well when you just want to see the article's content. The clean key allows you to provide an array of selectors identifying elements that should be removed from the content. 

Here's an example:

```javascript
export const ExampleExtractor = {
  ...

  content: {
    selectors: [
      'div.g-blocks',
      'article#story',
    ],

    // Selectors to remove from the extracted content
    clean: [
      '.related',
      '.hidden',
    ],
  }

  ...
}
```

### Using transforms

Occasionally, in order to mold the article content to a form that's readable outside the page, you need to transform a few elements inside the content you've chosen. That's where `transforms` come in.

This example demonstrates a simple tranform that converts h1 headers to h2 headers, along with a more complex transform that transforms lazy-loaded images to images that will render as you would expect outside the context of the site you're extracting from.

```javascript
export const ExampleExtractor = {
  ...

  content: {
    selectors: [
      'div.article-content',
    ],

    transforms: {
      // In a simple tranform, each key is the selector,
      // and the value, provided it's a string, represents
      // the tag that the matched item should be transformed to.

      // Convert h1s to h2s
      h1: 'h2',

      // If a function is given as the value, it should return a string
      // to convert to or nothing (in which case it will not perform
      // the transformation.

      // Convert lazy-loaded noscript images to figures
      noscript: ($node) => {
        const $children = $node.children();
        if ($children.length === 1 && $children.get(0).tagName === 'img') {
          return 'figure';
        }

        return null;
      },
    },
  },
```

For much more complex tranforms, you can perform dom manipulation within the tranform function, but this is discouraged unless absolutely necessary. See, for example, the lazy-loaded image transform in [the NYTimesExtractor](www.nytimes.com/index.js#L25), which transforms the src attribute on the lazy-loaded image.

## Submitting a custom extractor

If you've written a custom extractor, please send us a pull request! Passing tests that demonstrate your parser in action will help us evaluate the parser. If you need more guidance for your custom parser or your tests, peruse any of the [custom extractors](./) and their accompanying tests.
