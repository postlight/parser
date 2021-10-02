import { CustomExtractor } from '../extractors/types';

const merge = (extractor: CustomExtractor, domains: string[]) =>
  domains.reduce(
    (acc, domain) => {
      acc[domain] = extractor;
      return acc;
    },
    {} as Record<string, CustomExtractor>
  );

export function mergeSupportedDomains(extractor: CustomExtractor) {
  return extractor.supportedDomains
    ? merge(extractor, [extractor.domain, ...extractor.supportedDomains])
    : merge(extractor, [extractor.domain]);
}
