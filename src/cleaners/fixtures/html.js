const HTML = {
  docWithH1: '<div><h1>This Is the Real Title</h1></div>',
  docWith2H1s: `
    <div>
      <h1>This Is the Real Title</h1>
      <h1>This Is the Real Title</h1>
    </div>
  `,
  docWithTagsInH1: {
    before: '<div><h1>This Is the <em>Real</em> Title</h1></div>',
    after: 'This Is the Real Title',
  },
};

export default HTML;
