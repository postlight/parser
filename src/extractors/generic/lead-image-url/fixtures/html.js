const HTML = {
  og: {
    test: `
      <html>
        <head>
          <meta name="og:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `,
    result: 'http://example.com/lead.jpg',
  },
  twitter: {
    test: `
      <html>
        <head>
          <meta name="twitter:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `,
    result: 'http://example.com/lead.jpg',
  },
  scoring: {
    test: `
      <div>
        <img src="http://example.com/sprite/abadpic.jpg" />
        <img src="http://example.com/upload/goodpic.jpg" />
        <img src="http://example.com/upload/whateverpic.png" />
      </div>
    `,
    result: 'http://example.com/upload/goodpic.jpg',
  },
  selectors: {
    test: `
      <div>
        <link rel="image_src" href="http://example.com/upload/goodpic.jpg">
      </div>
    `,
    result: 'http://example.com/upload/goodpic.jpg',
  },
};

export default HTML;
