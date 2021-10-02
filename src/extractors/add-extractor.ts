import { mergeSupportedDomains } from '../utils/merge-supported-domains';
import { CustomExtractor } from './types';

export const apiExtractors: Record<string, CustomExtractor> = {};

export function addExtractor(extractor: CustomExtractor) {
  if (!extractor || !extractor.domain) {
    return {
      error: true,
      message: 'Unable to add custom extractor. Invalid parameters.',
    };
  }

  Object.assign(apiExtractors, mergeSupportedDomains(extractor));

  return apiExtractors;
}
