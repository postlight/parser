import insertValues from './insert-values';

const bodyPattern = /^\n([\s\S]+)\s{2}$/gm;
const trailingWhitespace = /\s+$/;

export default function template(strings, ...values) {
  const compiled = insertValues(strings, ...values);
  let [body] = compiled.match(bodyPattern) || [];
  let indentLevel = /^\s{0,4}(.+)$/g;

  if (!body) {
    body = compiled;
    indentLevel = /^\s{0,2}(.+)$/g;
  }

  return body
    .split('\n')
    .slice(1)
    .map(line => {
      line = line.replace(indentLevel, '$1');

      if (trailingWhitespace.test(line)) {
        line = line.replace(trailingWhitespace, '');
      }

      return line;
    })
    .join('\n');
}
