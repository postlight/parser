import escapeHtml from 'escape-html';

export default function textToHtml(text) {
  text = escapeHtml(text);
  text = text.replace(/(?:\n\n)/g, '<p />');
  text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
  return text;
}
