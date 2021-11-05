import { CUT_MONTHS, DAYS, MONTHS } from '../data/constants';
import { capitalizeFirstLetter } from './utils';

type DateProps = Date | string | null;

const createDate = (date: DateProps) => (date ? new Date(date) : new Date());

export const isBefore = (date1: DateProps, date2: DateProps) => createDate(date1) < createDate(date2);

export const formatDate = (date: Date | string, cut: Boolean = false) => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDay();
  const month = formatedDate.getMonth();
  return cut
    ? `${capitalizeFirstLetter(DAYS[day])} ${formatedDate.getDate()} ${capitalizeFirstLetter(CUT_MONTHS[month])}`
    : `${capitalizeFirstLetter(DAYS[day])} ${formatedDate.getDate()} ${capitalizeFirstLetter(MONTHS[month])}`;
};

export const formatTime = (date: Date) => `${date.getHours()}:${displayMinutes(date)}`;

export const displayMinutes = (date: Date) => {
  if (date.getMinutes() < 10) return '0'.concat(date.getMinutes().toString());
  return date.getMinutes();
};
