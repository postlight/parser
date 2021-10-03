/// <reference types="node" />
import cheerio from 'cheerio';
import { ErrorResult, SuccessResult } from './utils/fetch-resource';
declare const Resource: {
    create(url: string, preparedResponse?: string | Buffer | undefined, parsedUrl?: URL | undefined, headers?: Record<string, string>): Promise<cheerio.Root | ErrorResult>;
    generateDoc({ body: content, response }: SuccessResult): cheerio.Root;
    encodeDoc({ content, contentType, }: {
        content: Buffer | string;
        contentType: string;
    }): cheerio.Root;
};
export default Resource;
