import { CustomExtractor } from './types';
export declare const apiExtractors: Record<string, CustomExtractor>;
export declare function addExtractor(extractor: CustomExtractor): Record<string, CustomExtractor> | {
    error: boolean;
    message: string;
};
