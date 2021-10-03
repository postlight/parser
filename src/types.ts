import {
  ContentExtractorResult,
  CustomExtractor,
  Extend,
  FullExtractorResult,
} from './extractors/types';

export interface Options {
  html?: string;
  fetchAllPages?: boolean;
  fallback?: boolean;
  contentType?: string;
  headers?: Record<string, string>;
  extend?: Extend;
  customExtractor?: CustomExtractor;
}

export type Result = (FullExtractorResult | ContentExtractorResult) & {
  total_pages: number;
  pages_rendered: number;
};

export interface ErrorResult {
  type: 'error';
  message: string;
}
