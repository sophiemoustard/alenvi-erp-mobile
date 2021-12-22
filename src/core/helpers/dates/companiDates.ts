import { DateTime, DateTimeUnit } from './luxon';

type DateTypes = Date | CompaniDateType | string;

type CompaniDateType = {
  getDate: DateTime,
  format: (str: string) => string,
  toDate: () => Date,
  isBefore: (date: DateTypes) => Boolean,
  startOf: (unit: DateTimeUnit) => CompaniDateType,
  endOf: (unit: DateTimeUnit) => CompaniDateType,
}

const CompaniDate = (...args: DateTypes[]) : CompaniDateType => (
  CompaniDateFactory(_formatMiscToCompaniDate(...args))
);

const CompaniDateFactory = (inputDate: DateTime): CompaniDateType => {
  const _date = inputDate;

  return ({
    // GETTER
    get getDate() {
      return _date;
    },

    // DISPLAY
    format(fmt: string) {
      return _date.toFormat(fmt);
    },

    toDate() {
      return _date.toUTC().toJSDate();
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

const _formatMiscToCompaniDate = (...args: DateTypes[]) => {
  if (!args.length) return DateTime.now();

  if (args.length === 1) {
    if (args[0] instanceof Date) return DateTime.fromJSDate(args[0]);
    if (args[0] instanceof Object && args[0]?.getDate instanceof DateTime) return args[0].getDate;
    if (typeof args[0] === 'string' && args[0] !== '') return DateTime.fromISO(args[0]);
  }

  if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    const options = args[0].endsWith('Z') ? { zone: 'utc' } : {};
    return DateTime.fromFormat(args[0], args[1], options);
  }

  return DateTime.invalid('wrong arguments');
};

export default CompaniDate;
