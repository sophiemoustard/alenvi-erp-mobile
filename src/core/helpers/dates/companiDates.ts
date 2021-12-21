import { DateTimeUnit } from 'luxon';
import { DateTime } from './luxon';

type DateTypes = Date | CompaniDateType | string | DateTime;

type CompaniDateType = {
  _date: DateTime;
  format: (str: string) => string,
  toDate: () => Date,
  isBefore: (date: DateTypes) => Boolean,
  startOf: (unit: DateTimeUnit) => CompaniDateType,
  endOf: (unit: DateTimeUnit) => CompaniDateType,
}

const CompaniDate = (...args: [] | [DateTypes] | [DateTypes, string]) : CompaniDateType => (
  CompaniDateFactory(_formatMiscToCompaniDate(...args))
);

const CompaniDateFactory = (inputDate: DateTime): CompaniDateType => {
  const _date = inputDate;

  return ({
    // GETTER
    get _date() {
      return _date;
    },

    // DISPLAY
    format(fmt: string) {
      return _date.toFormat(fmt);
    },

    toDate() {
      return this._date.toUTC().toJSDate();
    },

    // QUERY
    isBefore(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date < otherDate;
    },

    // MANIPULATE
    startOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.startOf(unit));
    },

    endOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.endOf(unit));
    },
  });
};

const _formatMiscToCompaniDate = (...args: any[]) => {
  if (!args.length) return DateTime.now();

  if (args.length === 1) {
    if (args[0] instanceof Object && args[0]?._date instanceof DateTime) return args[0]._date();
    if (args[0] instanceof DateTime) return args[0];
    if (args[0] instanceof Date) return DateTime.fromJSDate(args[0]);
    if (typeof args[0] === 'string' && args[0] !== '') return DateTime.fromISO(args[0]);
  }

  if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    const options = args[0].endsWith('Z') ? { zone: 'utc' } : {};
    return DateTime.fromFormat(args[0], args[1], options);
  }

  return DateTime.invalid('wrong arguments');
};

export default CompaniDate;
