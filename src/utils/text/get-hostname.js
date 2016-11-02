import URL from 'url';

export default function getHostname(url) {
  const { hostname } = URL.parse(url);

  return hostname;
}
