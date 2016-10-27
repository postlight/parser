import mergeSupportedDomains from 'utils/merge-supported-domains';
import * as CustomExtractors from './custom/index';

export default Object.keys(CustomExtractors).reduce((acc, key) => {
  const extractor = CustomExtractors[key];
  return {
    ...acc,
    ...mergeSupportedDomains(extractor),
  };
}, {});
