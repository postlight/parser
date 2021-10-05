import { mergeSupportedDomains } from '../utils/merge-supported-domains';
import { CustomExtractor } from './types';
// const CustomExtractors = require('extractors/custom/index');
import * as CustomExtractors from './custom';

const allCustomExtractors = CustomExtractors as unknown as Record<
  string,
  CustomExtractor
>;

const all = Object.keys(CustomExtractors).reduce((acc, key) => {
  const extractor = allCustomExtractors[key];
  return {
    ...acc,
    ...mergeSupportedDomains(extractor),
  };
}, {} as Record<string, CustomExtractor>);

export default all;
