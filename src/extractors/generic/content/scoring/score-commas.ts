// return 1 for every comma in text
export function scoreCommas(text: string) {
  return (text.match(/,/g) || []).length;
}
