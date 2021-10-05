/// <reference types="node" />
export declare function validateResponse(response: Response, parseNon200?: boolean): boolean;
export declare function baseDomain({ host }: {
    host: string;
}): string;
export declare type SuccessResult = {
    type: 'success';
    body: Buffer | string;
    headers: Headers;
};
export declare type ErrorResult = {
    type: 'error';
    message: string;
};
export declare type Result = SuccessResult | ErrorResult;
export declare function fetchResource(url: string, parsedUrl?: URL, headers?: Record<string, string>): Promise<Result>;
