export default function removeAnchor(url) {
  return url.split('#')[0].replace(/\/$/, '');
}
