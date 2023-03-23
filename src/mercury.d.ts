declare module '@postlight/parser' {
  export type ExtractorArgs = any;

  export type ParserOptions = {
    html?: string;
    fetchAllPages?: boolean;
    fallback?: boolean;
    contentType?: 'html' | 'markdown' | 'text';
    headers?: Record<string, string>;
    extend?: boolean;
    customExtractor?: (args: ExtractorArgs) => ParserResult;
  };

  export type ParserResult = {
    title: string;
    content: string;
    author: string;
    date_published: string;
    lead_image_url: string;
    dek: string;
    next_page_url: string;
    url: string;
    domain: string;
    excerpt: string;
    word_count: number;
    direction: string;
    total_pages: number;
    rendered_pages: number;
  };

  export function parse(
    url: string,
    opts: ParserOptions
  ): Promise<ParserResult>;

  const exported: {
    parse: typeof parse;
  };
  export default exported;
}
