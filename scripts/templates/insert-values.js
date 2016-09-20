export default function insertValues(strings, ...values) {
  if (values.length) {
    return strings.reduce((result, part, idx) => {
      let value = values[idx];

      if (value && typeof value.toString === 'function') {
        value = value.toString();
      } else {
        value = '';
      }

      return result + part + value;
    }, '');
  }

  return strings.join('');
}
