# Custom Parsers

Mercury can extract meaningful content from almost any web site, but custom parsers/extractors allow the Mercury Parser to find the content more quickly and more accurately than it might otherwise do. Our goal is to include custom parsers as many sites as we can, and we'd love your help!

## Runtime extractors

Mercury can obtain extractor with API in runtime.

```javascript
import Mercury from '@postlight/mercury-parser';
//...
import ExampleComExtractor from './ExampleComExtractor';

Mercury.addExtractor(ExampleComExtractor);

//...

Mercury.parse('www.example.com').then(result => console.log(result));
```

## The basics of parsing a site with a custom parser

Custom parsers allow you to write CSS selectors that will find the content you're looking for on the page you're testing against. If you've written any CSS or jQuery, CSS selectors should be very familiar to you.

You can query for every field returned by the Mercury Parser:

- `title`
- `author`
- `content`
- `date_published`
- `lead_image_url`
- `dek`
- `next_page_url`
- `excerpt`

### Using selectors

CSS selectors allow you to target any content in the HTML document for extraction.

#### Basic selectors

To demonstrate, let's start with something simple. A selector for the page's title might look something like this (you can ignore the boilerplate on top and bottom for now and just focus on the `title` key):

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

As you might guess, the selectors key provides an array of selectors that Mercury will check to find your title text. In our `ExampleExtractor`, we're saying that the title can be found in the text of an `h1` header with a class name of `hed`.

The selector you choose should return one element. If more than one element is returned by your selector, it will fail (and Mercury will fall back to its generic extractor).

Because the `selectors` property returns an array, you can write more than one selector for a property extractor. This is particularly useful for sites that have multiple templates for articles. If you provide an array of selectors, Mercury will try each in order, falling back to the next until it finds a match or exhausts the options (in which case it will fall back to its default generic extractor).

#### Selecting an attribute

Sometimes the information you want to return lives in an element's attribute rather than its text — e.g., often a more exact ISO-formatted date/time will be stored in an attribute of an element.

Say your element looks like this:

```html
<time class="article-timestamp" datetime="2016-09-02T07:30:01-04:00"></time>
```

The text you want isn't the text inside a matching element, but rather, inside the `datetime` attribute. To write a selector that returns an attribute, you provide your custom parser with a two-element array. The first element is your selector; the second element is the attribute you'd like to return.

```javascript
export const ExampleExtractor = {
    ...

    // This example returns the datetime attribute if it exists
    date_published: {
      selectors: [
        ['time.article-timestamp[datetime]', 'datetime'],
      ],
    },

    ...
```

This is all you'll need to know to handle most of the fields Mercury parses (titles, authors, date published, etc.). Article content is the exception.

#### Content selectors

If you pass an array selector for the content selection, it behaves differently from the attribute selectors on other types. In such cases, it will be considered as a multi-match selection, which allows the parser to choose several selectors to include in the result, and will include all occurrences of each matching selector in the result.

Note that all selectors in the array must match in order for this selector to trigger.

```javascript
export const ExampleExtractor = {
    ...

    // Attempt to match both the content and image
    // before falling back to just the content
    content: {
      selectors: [
        ['.parsys.content', '.__image-lead__'],
        '.content'
      ],
    },

    ...
```

### Custom types

To add a custom key to the response, add an `extend` object. The response will include
results for each key of this object (`categories` in the example below). Setting
`allowMultiple` to `true` means Mercury will find all the content that matches the
selectors, and will always return an array of results for that key.

```javascript
export const ExampleExtractorWithExtend = {
    ...

    extend: {
      categories: {
        selectors: ['.post-taglist a'],
        allowMultiple: true,
      }
    },

    ...
```

### Cleaning content from an article

An article's content can be more complex than the other fields, meaning you sometimes need to do more than just provide the selector(s) in order to return clean content.

For example, sometimes an article's content will contain related content (e.g., _Read also_) that doesn't translate or render well when you just want to see the article. The `clean` key allows you to provide an array of selectors identifying elements that should be removed from the content.

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

The above example will first select the content based on either of the two `content` selectors, then it will clean any nodes from the selected content that matches the selectors defined by `clean`.

### Using transforms

Occasionally, in order to mold the article content to a form that's readable outside the page, you need to transform a few elements inside the content you've chosen. That's where `transforms` come in.

This example demonstrates a simple tranform that converts `h1` headers to `h2` headers, along with a more complex transform that transforms lazy-loaded images to images that will render as you would expect outside the context of the site you're extracting from.

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
      noscript: $node => {
        const $children = $node.children();
        if ($children.length === 1 && $children.get(0).tagName === 'img') {
          return 'figure';
        }

        return null;
      },
    },
  },
```

For much more complex tranforms, you can perform dom manipulation within the tranform function, but this is discouraged unless absolutely necessary. See, for example, the lazy-loaded image transform in [the NYTimesExtractor](www.nytimes.com/index.js#L25), which transforms the `src` attribute on the lazy-loaded image.

## How to generate a custom parser

Now that you know the basics of how custom extractors work, let's walk through the workflow for how to write and submit one. For our example, we're going to create a custom parser for [The New Yorker](http://www.newyorker.com/). (You can find the results of this tutorial [in the NewYorkerExtractor source](www.newyorker.com).)

### Step 0: Installation

First, you'll need to clone the Mercury Parser repository and install dependencies.

```bash
git clone git@github.com:postlight/mercury-parser.git

cd mercury-parser

yarn install
```

If you don't have already have watchman installed, you'll also need to install that:

```bash
brew install watchman
```

Take a look at the existing custom parsers in [`src/extractors/custom`](/src/extractors/custom) for examples and to check if the site you want to write a parser for already exists.

If not, go ahead and create a new git branch for your custom extractor:

```bash
git checkout -b feat-new-yorker-extractor
```

### Step 1: Generate your custom parser

If we don't already have a parser for the site you want to contribute, you're ready to generate a new custom parser. To do so, run:

```bash
yarn generate-parser
```

This script will prompt you to paste a link to an article you want to parse. The URL you choose will serve as the example your parser will test against. The script will also generate your custom parser and some barebones (and failing) tests for your parser.

For our New Yorker example, we're going to use [this story](http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing).

When the generator script completes, you'll be prompted to run:

```bash
yarn watch:test www.newyorker.com
```

This will run the tests for the parser you just generated, which should fail (which makes sense — you haven't written any selectors yet!). Your goal now is to follow the instructions in the generated `www.newyorker.com/index.test.js` and `www.newyorker.com/index.js` files until they pass!

### Step 2: Passing your first test: Title extraction

If you look at your parser's test file, you'll see a few instructions to guide you in polishing your parser and making your tests pass.

By default, the first test, which ensures your custom extractor is being selected properly, should be passing. The first failing test checks to see whether your extractor returns the correct title:

```javascript
it('returns the title', async () => {
  // To pass this test, fill out the title selector
  // in ./src/extractors/custom/www.newyorker.com/index.js.
  const html = fs.readFileSync(
    './fixtures/www.newyorker.com/1475245895852.html'
  );
  const articleUrl =
    'http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing';

  const { title } = await Mercury.parse(articleUrl, { html, fallback: false });

  // Update these values with the expected values from
  // the article.
  assert.equal(title, 'Schrödinger’s Hack');
});
```

As you can see, to pass this test, we need to fill out our title selector. In order to do this, you need to know what your selector is. To do this, open the html fixture the generator downloaded for you in the [`fixtures`](/fixtures) directory. In our example, that file is `fixtures/www.newyorker.com/1475248565793.html`. Now open that file in your web browser.

The page should look more or less exactly like the site you pointed it to, but this version is downloaded locally for test purposes. (You should always look for selectors using this local fixture rather than the actual web site; some sites re-write elements after the page loads, and we want to make sure we're looking at the page the same way Mercury will be.)

(For the purpose of this guide, we're going to assume you're using Chrome as your default browser; any browser should do, but we're going to refer specifically to Chrome's developer tools in this guide.)

So, back to the title: We want to make sure our test finds the same title we see on the page. In our example, the title of the article is "Hacking, Cryptography, and the Countdown to Quantum Computing." To find the selector (again, in Chrome), press Cmd+Shift+C on OS X, or Ctrl+Shift+C on Windows, then click on the title.

The selector for this title appears to be `h1.title`. To verify that we're right, click on the Console tab in Chrome's Developer Tools and run the following check:

```javascript
$$('h1.title');
```

If that returns only one match (i.e., an array with just one element), and the text of that element looks like the title we want, you're good to go!

Now, in your custom parser file, enter `h1.title` in your list of selectors for the title extractor:

```javascript
export const NewYorkerExtractor = {
  domain: 'www.newyorker.com',
  title: {
    selectors: [
      'h1.title',
    ],
  },

  ...

}
```

Save the file, and... uh oh, our example still fails.

```javascript
AssertionError: 'Hacking, Cryptography, and the Countdown to Quantum Computing' ==
  'Schrödinger’s Hack';
```

When Mercury generated our test, it took a guess at the page's title, and in this case, it got it wrong. So update the test with the title we expect, save it, and your test should pass!

### Step 3: Speed it up

We've been moving at a slow pace, but as you can see, once you understand the basics, extracting most items on the page is actually very easy. For example, if you follow the same instructions to find the author selector, you'll find that the `.contributors` selector will return the correct author (Alex Hutchinson).

For a slightly more complex example, you'll find after a bit of looking that the best place to get the most accurate datetime on the page is in the head of the document, in the value attribute of a meta tag:

```html
<meta value="2016-09-26T14:04:22-04:00" name="article:published_time" />
```

As [explained above](#selecting-an-attribute), to return an attribute rather than the text inside an element, your selector should be an array where the first element is the element selector and the second element is the attribute you want to return. So, in this example, the date_published selector should look like this:

```javascript
  ...

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ]
  },

  ...
```

In rare circumstances, you may want to manipulate the result of the attribute value. In these cases, you can add a third element to the selector array above — a function that will take the value of the attribute and return a value you've transformed it to. E.g., imagine that you want to access a JSON value that's been stringified into an attribute. Your function could take the stringified JSON, parse it, and return just the piece of it you want.

You can refer to the [NewYorkerExtractor](www.newyorker.com/index.js) to see more the rest of the basic selectors.

### Step 4: Content extraction

I've left content extraction for last, since it's often the trickiest, sometimes requiring special passes to [clean](#cleaning-content) and [transform](#using-tranforms) the content. For the New Yorker, the first part is easy: The selector for this page is clearly `div#articleBody`. But that's just our first step, because unlike the other tests, where we want to make sure we're matching a simple string, we need to sanity check that the page looks good when it's rendered, and that there aren't any elements returned by our selector that we don't want.

To aid you in previewing the results, you can run the `./preview` script to see what the title and content output look like. So, after you've chosen your selector, run the preview script on the URL you're testing:

```bash
./preview http://www.newyorker.com/tech/elements/hacking-cryptography-and-the-countdown-to-quantum-computing
```

This script will open both an `html` and `json` file allowing you to preview your results. Luckily for us, the New Yorker content is simple, and doesn't require any unusual cleaning or transformations — at least not in this example. Remember that if you do see content that needs cleaned or transformed in the selected content, you can follow the instructions in the [clean](#cleaning-content) and [transform](#using-tranforms) sections above.

## Submitting a custom extractor

If you've written a custom extractor, please send us a pull request! Passing tests that demonstrate your parser in action will help us evaluate the parser.

Sometimes you may find that the site you're parsing doesn't provide certain information. For example, some sites don't have deks, and in those instances, you don't need to write a selector for that field. If there's a test for a selector you don't need, you can just remove that test and make note of it in your pull request.
