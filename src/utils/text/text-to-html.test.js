import assert from 'assert';

import textToHtml from './text-to-html';

describe('textToHtml(text)', () => {
  it('converts text to html with proper br and p tags', () => {
    const text = `
CONTENTS OF A TEXT FILE
-----------------------

1. Test a text file.
2. Test another text file.

Instructions on how to be a good text file.

Foo Bar, Lorem Ipsum
`;
    assert.equal(textToHtml(text).includes('<p />'), true);
    assert.equal(textToHtml(text).includes('<br />'), true);
  });

  it('escapes HTML tags', () => {
    const text = '<script>alert(\'send a popup\');</script>';
    assert.equal(textToHtml(text), '&lt;script&gt;alert(&#39;send a popup&#39;);&lt;/script&gt;');
  });
});
