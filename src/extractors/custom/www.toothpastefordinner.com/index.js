export const WwwToothpastefordinnerComExtractor = {
  domain: 'www.toothpastefordinner.com',

  title: {
    selectors: ['h4 a'],
  },
  // p:has(img[style="max-width:640px;"])
  content: {
    defaultCleaner: false,
    selectors: ['.jumbotron'],
  },
};
