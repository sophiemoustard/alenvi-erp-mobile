import luxon from './luxon';

type CompaniDateType = {
  _date: luxon.DateTime;
  format: (str: string) => string,
}

const CompaniDate = (...args: any[]) => CompaniDateFactory(_formatMiscToCompaniDate(...args));

const CompaniDateFactory = (inputDate: luxon.DateTime): CompaniDateType => {
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

    // QUERY

    // MANIPULATE

  });
};

const _formatMiscToCompaniDate = (...args: any[]) => {
  if (!args.length) return luxon.DateTime.now();

  if (args.length === 1) {
    if (args[0] instanceof Object && args[0]?._date instanceof luxon.DateTime) return args[0]._getDate();
    if (args[0] instanceof luxon.DateTime) return args[0];
    if (args[0] instanceof Date) return luxon.DateTime.fromJSDate(args[0]);
    if (typeof args[0] === 'string' && args[0] !== '') return luxon.DateTime.fromISO(args[0]);
  }

  if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    const options = args[0].endsWith('Z') ? { zone: 'utc' } : {};
    return luxon.DateTime.fromFormat(args[0], args[1], options);
  }

  return luxon.DateTime.invalid('wrong arguments');
};

export default CompaniDate;
