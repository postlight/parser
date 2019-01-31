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
