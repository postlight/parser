import moment, { MomentFormatSpecification } from 'moment-timezone';
export declare function cleanDateString(dateString: string): string;
export declare function createDate(dateString: string, timezone: string | undefined, format: MomentFormatSpecification | undefined): moment.Moment;
export declare function cleanDatePublished(dateString: string, { timezone, format, }?: {
    timezone?: string;
    format?: MomentFormatSpecification;
} | undefined): string | undefined;
