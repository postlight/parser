// this is a shim for the browser build;
// iconv-lite doubles build size, and we
// don't need it for already rendered text
const iconv = {
  encodingExists: () => (
    false
  ),
};

export default iconv;
