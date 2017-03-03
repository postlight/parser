// this is a shim for the browser build;
// iconv-lite doubles build size, and we
// don't need it for already rendered text
const iconv = {
  encodingExists: (encoding) => {
    const encodings = ['utf-8', 'iso-8859-15'];
    return encodings.includes(encoding);
  },
};

export default iconv;
