import pick from 'lodash/pick';
import { DateTime, DateTimeUnit, ToRelativeUnit } from './luxon';

type DateTypes = Date | CompaniDateType | string;

type ObjectDateType = {
  [key in DateTimeUnit]?: number
};

type ObjectDurationType = {
  [key in ToRelativeUnit]?: number;
};

type CompaniDateType = {
  _getDate: DateTime,
  getUnits: (units: DateTimeUnit[]) => ObjectDateType,
  format: (str: string) => string,
  toDate: () => Date,
  toISO: () => string,
  isBefore: (date: DateTypes) => boolean,
  isAfter: (date: DateTypes) => boolean,
  startOf: (unit: DateTimeUnit) => CompaniDateType,
  endOf: (unit: DateTimeUnit) => CompaniDateType,
  diff: (date: DateTypes, unit: ToRelativeUnit) => ObjectDurationType,
  add: (amount: ObjectDurationType) => CompaniDateType,
  set: (values: ObjectDateType) => CompaniDateType,
}

const CompaniDate = (...args: DateTypes[]) : CompaniDateType => (
  CompaniDateFactory(_formatMiscToCompaniDate(...args))
);

const CompaniDateFactory = (inputDate: DateTime): CompaniDateType => {
  const _date = inputDate;

  return ({
    // GETTER
    get _getDate() {
      return _date;
    },

    getUnits(units: DateTimeUnit[]) {
      return pick(_date.toObject(), units);
    },

    // DISPLAY
    format(fmt: string) {
      return _date.toFormat(fmt);
    },

    toDate() {
      return _date.toUTC().toJSDate();
    },

    toISO() {
      return _date.toUTC().toISO();
    },

    // QUERY
    isBefore(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date < otherDate;
    },

    isAfter(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date > otherDate;
    },

    // MANIPULATE
    startOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.startOf(unit));
    },

    endOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.endOf(unit));
    },

    diff(miscTypeOtherDate : DateTypes, unit: ToRelativeUnit) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);
      const floatedDiff = _date.diff(otherDate, unit).as(unit);
      const roundedDiff = floatedDiff > 0 ? Math.floor(floatedDiff) : Math.ceil(floatedDiff);

      return { [unit]: roundedDiff };
    },

    add(amount: ObjectDurationType) {
      return CompaniDateFactory(_date.plus(amount));
    },

    set(values: ObjectDateType) {
      return CompaniDateFactory(_date.set(values));
    },
  });
};

const _formatMiscToCompaniDate = (...args: DateTypes[]) => {
  if (!args.length) return DateTime.now();

  if (args.length === 1) {
    if (args[0] instanceof Date) return DateTime.fromJSDate(args[0]);
    if (args[0] instanceof Object && args[0]?._getDate instanceof DateTime) return args[0]._getDate;
    if (typeof args[0] === 'string' && args[0] !== '') return DateTime.fromISO(args[0]);
    // if (typeof args[0] === 'string' && args[0] !== '') {
    //   try {
    //     return DateTime.fromISO(args[0]);
    //   } catch { // if date is a stringed JS Date (ex: "Tue Jan 04 2022 11:47:04 GMT+0100 (CET)")
    //     return DateTime.fromJSDate(new Date(args[0]));
    //   }
    // }
  }

  if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    const options = args[0].endsWith('Z') ? { zone: 'utc' } : {};
    return DateTime.fromFormat(args[0], args[1], options);
  }

  return DateTime.invalid('wrong arguments');
};

export default CompaniDate;
