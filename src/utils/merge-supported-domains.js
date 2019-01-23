const merge = (extractor, domains) =>
  domains.reduce((acc, domain) => {
    acc[domain] = extractor;
    return acc;
  }, {});

export default function mergeSupportedDomains(extractor) {
  return extractor.supportedDomains
    ? merge(extractor, [extractor.domain, ...extractor.supportedDomains])
    : merge(extractor, [extractor.domain]);
}
