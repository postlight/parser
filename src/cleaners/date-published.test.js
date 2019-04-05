import assert from 'assert';
import moment from 'moment-timezone';

import cleanDatePublished, { cleanDateString } from './date-published';

describe('cleanDatePublished(dateString)', () => {
  it('returns a date', () => {
    const datePublished = cleanDatePublished('published: 1/1/2020');

    assert.equal(datePublished, moment('1/1/2020', 'MM/DD/YYYY').toISOString());
  });

  it('returns null if date is invalid', () => {
    const datePublished = cleanDatePublished('blargh');

    assert.equal(datePublished, null);
  });

  it('handles timezones', () => {
    // The JS date parser is forgiving, but
    // it needs am/pm separated from a time
    const datePublished = cleanDatePublished('November 29, 2016: 8:18 AM ET', {
      timezone: 'America/New_York',
    });
    assert.equal(datePublished, '2016-11-29T13:18:00.000Z');
  });

  it('accepts a custom date format', () => {
    // The JS date parser is forgiving, but
    // it needs am/pm separated from a time
    const datePublished = cleanDatePublished('Mon Aug 03 12:45:00 EDT 2015', {
      timezone: 'America/New_York',
      format: 'ddd MMM DD HH:mm:ss zz YYYY',
    });
    assert.equal(datePublished, '2015-08-03T16:45:00.000Z');
  });

  it('can handle dates formatted as "[just|right] now"', () => {
    const date1 = cleanDatePublished('now');
    const newDate1 = moment(date1)
      .format()
      .split('T')[0];
    const expectedDate1 = moment()
      .format()
      .split('T')[0];
    assert.equal(newDate1, expectedDate1);

    const date2 = cleanDatePublished('just now');
    const newDate2 = moment(date2)
      .format()
      .split('T')[0];
    const expectedDate2 = moment()
      .format()
      .split('T')[0];
    assert.equal(newDate2, expectedDate2);

    const date3 = cleanDatePublished('right now');
    const newDate3 = moment(date3)
      .format()
      .split('T')[0];
    const expectedDate3 = moment()
      .format()
      .split('T')[0];
    assert.equal(newDate3, expectedDate3);
  });

  it('can handle dates formatted as "[amount] [time unit] ago"', () => {
    // This generates an approximate date with a margin of error, for example:
    // "X days ago" will not be accurate down to the exact time
    // "X months ago" will not be accurate down to the exact day
    const date1 = cleanDatePublished('1 hour ago');
    const newDate1 = moment(date1)
      .format()
      .split('T')[0];
    const expectedDate1 = moment()
      .subtract(1, 'hour')
      .format()
      .split('T')[0];
    assert.equal(newDate1, expectedDate1);

    const date2 = cleanDatePublished('5 days ago');
    const newDate2 = moment(date2)
      .format()
      .split('T')[0];
    const expectedDate2 = moment()
      .subtract(5, 'days')
      .format()
      .split('T')[0];
    assert.equal(newDate2, expectedDate2);

    const date3 = cleanDatePublished('10 months ago');
    const newDate3 = moment(date3)
      .format()
      .split('T')[0];
    const expectedDate3 = moment()
      .subtract(10, 'months')
      .format()
      .split('T')[0];
    assert.equal(newDate3, expectedDate3);
  });
});

describe('cleanDateString(dateString)', () => {
  it('removes "published" text from an datePublished string', () => {
    const datePublished = cleanDateString('published: 1/1/2020');

    assert.equal(datePublished, '1/1/2020');
  });

  it('trims whitespace', () => {
    const datePublished = cleanDateString('    1/1/2020     ');

    assert.equal(datePublished, '1/1/2020');
  });

  it('puts a space b/w a time and am/pm', () => {
    // The JS date parser is forgiving, but
    // it needs am/pm separated from a time
    const date1 = cleanDateString('1/1/2020 8:30am');
    assert.equal(date1, '1/1/2020 8:30 am');

    const date2 = cleanDateString('8:30PM 1/1/2020');
    assert.equal(date2, '8:30 PM   1/1/2020');
  });

  it('cleans the dots from a.m. or p.m.', () => {
    // The JS date parser is forgiving, but
    // it needs a.m./p.m. without dots
    const date1 = cleanDateString('1/1/2020 8:30 a.m.');
    assert.equal(date1, '1/1/2020 8:30 am');
  });

  it('can handle some tough timestamps', () => {
    // The JS date parser is forgiving, but
    // it needs am/pm separated from a time
    const date1 = cleanDateString(
      'This page was last modified on 15 April 2016, at 10:59.'
    );
    assert.equal(date1, '15 Apr 2016 10:59');
  });

  it('massages the T out', () => {
    // The JS date parser is forgiving, but
    // it needs am/pm separated from a time
    const date1 = cleanDateString('2016-11-22T08:57-500');
    assert.equal(date1, '2016 11 22 08:57 -500');
  });
});
