import moment from 'moment';
// Is there a compelling reason to use moment here?
// Mostly only being used for the isValid() method,
// but could just check for 'Invalid Date' string.

import {
  MS_DATE_STRING,
  SEC_DATE_STRING,
  CLEAN_DATE_STRING_RE,
  SPLIT_DATE_STRING,
  TIME_MERIDIAN_SPACE_RE,
  TIME_MERIDIAN_DOTS_RE,
} from './constants';

export function cleanDateString(dateString) {
  return (dateString.match(SPLIT_DATE_STRING) || [])
                   .join(' ')
                   .replace(TIME_MERIDIAN_DOTS_RE, 'm')
                   .replace(TIME_MERIDIAN_SPACE_RE, '$1 $2 $3')
                   .replace(CLEAN_DATE_STRING_RE, '$1')
                   .trim();
}

// Take a date published string, and hopefully return a date out of
// it. Return none if we fail.
export default function cleanDatePublished(dateString) {
  // If string is in milliseconds or seconds, convert to int
  if (MS_DATE_STRING.test(dateString) || SEC_DATE_STRING.test(dateString)) {
    dateString = parseInt(dateString, 10)
  }

  let date = moment(new Date(dateString));

  if (!date.isValid()) {
    dateString = cleanDateString(dateString);
    date = moment(new Date(dateString));
  }

  return date.isValid() ? date.toISOString() : null;
}
