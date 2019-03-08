import moment from 'moment-timezone';
import parseFormat from 'moment-parseformat';
// Is there a compelling reason to use moment here?
// Mostly only being used for the isValid() method,
// but could just check for 'Invalid Date' string.

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
    return moment(new Date(dateString));
  }

  if (TIME_AGO_STRING.test(dateString)) {
    const fragments = TIME_AGO_STRING.exec(dateString);
    return moment().subtract(fragments[1], fragments[2]);
  }

  if (TIME_NOW_STRING.test(dateString)) {
    return moment();
  }

  return timezone
    ? moment.tz(dateString, format || parseFormat(dateString), timezone)
    : moment(dateString, format || parseFormat(dateString));
}

// Take a date published string, and hopefully return a date out of
// it. Return none if we fail.
export default function cleanDatePublished(
  dateString,
  { timezone, format } = {}
) {
  // If string is in milliseconds or seconds, convert to int and return
  if (MS_DATE_STRING.test(dateString) || SEC_DATE_STRING.test(dateString)) {
    return new Date(parseInt(dateString, 10)).toISOString();
  }

  let date = createDate(dateString, timezone, format);

  if (!date.isValid()) {
    dateString = cleanDateString(dateString);
    date = createDate(dateString, timezone, format);
  }

  return date.isValid() ? date.toISOString() : null;
}
