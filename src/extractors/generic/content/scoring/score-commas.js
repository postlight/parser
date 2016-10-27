// return 1 for every comma in text
export default function scoreCommas(text) {
  return (text.match(/,/g) || []).length;
}
