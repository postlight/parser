import cheerio from 'cheerio';

export default function decodeEntities(str) {
  return cheerio.load(str, { decodeEntities: true }).text();
}
