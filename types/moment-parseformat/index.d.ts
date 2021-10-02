declare module 'moment-parseformat' {
  import { MomentFormatSpecification } from 'moment';

  interface PreferredOrder {
    [key: string]: string;
  }

  interface ParseFormat {
    (timestamp: string): MomentFormatSpecification;
    (
      timestamp: string,
      preferredOrder: { preferredOrder: string | PreferredOrder }
    ): MomentFormatSpecification;
  }

  const formatter: ParseFormat;
  export default formatter;
}
