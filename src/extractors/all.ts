import { mergeSupportedDomains } from '../utils/merge-supported-domains';
import { CustomExtractor } from './types';
const CustomExtractors = require('./custom/index');

export default Object.keys(CustomExtractors).reduce(
  (acc, key) => {
    const extractor = CustomExtractors[key];
    return {
      ...acc,
      ...mergeSupportedDomains(extractor),
    };
  },
  {} as Record<string, CustomExtractor>
);
