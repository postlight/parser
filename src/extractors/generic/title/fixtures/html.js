const HTML = {
  dcTitle: {
    test: `
      <html>
        <meta name="dc.title" value="This Is the Title Okay" />
      <html>
    `,
    result: 'This Is the Title Okay',
  },
  ogTitle: {
    test: `
      <html>
        <meta name="og:title" value="This Is the Title Okay" />
      <html>
    `,
    result: 'This Is the Title Okay',
  },
  strongTitleSelector: {
    test: `
      <html>
        <article class="hentry">
          <h1 class="entry-title">This Is the Title Okay</h1>
        </article>
      <html>
    `,
    result: 'This Is the Title Okay',
  },
  weakTitleSelector: {
    test: `
      <html>
        <head>
          <title>This Is the Weak Title Okay</title>
        </head>
      <html>
    `,
    result: 'This Is the Weak Title Okay',
  },
};

export default HTML;
