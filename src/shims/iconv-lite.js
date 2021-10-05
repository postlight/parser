// this is a shim for the browser build;
// iconv-lite doubles build size, and we
// don't need it for already rendered text
export const encodingExists = () => false;
export const decode = s => s;

export default {
  encodingExists,
  decode,
};
