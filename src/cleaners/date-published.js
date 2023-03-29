import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import {
  MS_DATE_STRING,
  SEC_DATE_STRING,
  CLEAN_DATE_STRING_RE,
  SPLIT_DATE_STRING,
  TIME_AGO_STRING,
  TIME_NOW_STRING,
  TIME_MERIDIAN_SPACE_RE,
  TIME_MERIDIAN_DOTS_RE,
  TIME_WITH_OFFSET_RE,
} from './constants';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezonePlugin);
dayjs.extend(advancedFormat);

export function cleanDateString(dateString) {
  return (dateString.match(SPLIT_DATE_STRING) || [])
    .join(' ')
    .replace(TIME_MERIDIAN_DOTS_RE, 'm')
    .replace(TIME_MERIDIAN_SPACE_RE, '$1 $2 $3')
    .replace(CLEAN_DATE_STRING_RE, '$1')
    .trim();
}

export function createDate(dateString, timezone, format) {
  if (TIME_WITH_OFFSET_RE.test(dateString)) {
    return dayjs(new Date(dateString));
  }

  if (TIME_AGO_STRING.test(dateString)) {
    const fragments = TIME_AGO_STRING.exec(dateString);
    return dayjs().subtract(fragments[1], fragments[2]);
  }

  if (TIME_NOW_STRING.test(dateString)) {
    return dayjs();
  }

  if (timezone) {
    try {
      return format
        ? dayjs.tz(dateString, format, timezone)
        : dayjs.tz(dayjs(dateString).format('YYYY-MM-DD HH:mm:ss'), timezone);
    } catch (error) {
      // return an intentionally invalid dayjs object,
      // in case the input needs to be cleaned first
      return dayjs('');
    }
  }
  return format ? dayjs(dateString, format) : dayjs(dateString);
}

// Take a date published string, and hopefully return a date out of
// it. Return none if we fail.
export default function cleanDatePublished(
  dateString,
  { timezone, format } = {}
) {
  // If string is in milliseconds or seconds, convert to int and return
  if (MS_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10)).toISOString();
  }
  if (SEC_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10) * 1000).toISOString();
  }

  let date = createDate(dateString, timezone, format);

  if (!date.isValid()) {
    dateString = cleanDateString(dateString);
    date = createDate(dateString, timezone);
  }

  return date.isValid() ? date.toISOString() : null;
}
