export const CustomExtractors = [];

export default function addExtractor({ hostName, baseDomain, extractor }) {
  if ((!hostName && !baseDomain) || !extractor) {
    return {
      error: true,
      message: 'Unable to add custom extractor. Invalid parameters.',
    };
  }

  if (hostName) {
    CustomExtractors[hostName] = extractor;
  }

  if (baseDomain) {
    CustomExtractors[baseDomain] = extractor;
  }

  return CustomExtractors;
}
