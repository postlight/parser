import URL from 'url';

export default function titleFromFilename(url) {
  if (typeof url === 'string') {
    url = URL.parse(url);
  }
  const { path } = url;
  const size = path.split('/').length;
  const filename = path.split('/')[size - 1];
  return filename;
}
