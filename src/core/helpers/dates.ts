import { MONTHS_SHORT, DAYS, MONTHS } from '../data/constants';
import { capitalizeFirstLetter } from './utils';

type DateProps = Date | string | null;

const createDate = (date: DateProps) => (date ? new Date(date) : new Date());

export const isBefore = (date1: DateProps, date2: DateProps) => createDate(date1) < createDate(date2);

export const formatDate = (date: Date | string, short: Boolean = false) => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDay();
  const month = formatedDate.getMonth();
  return `${capitalizeFirstLetter(DAYS[day])} ${formatedDate.getDate()} `
    + `${short ? capitalizeFirstLetter(MONTHS_SHORT[month]) : capitalizeFirstLetter(MONTHS[month])}`;
};

export const formatTime = (date: Date) => `${date.getHours()}:${displayMinutes(date)}`;

export const displayMinutes = (date: Date) => {
  if (date.getMinutes() < 10) return '0'.concat(date.getMinutes().toString());
  return date.getMinutes();
};

export const addTime = (date: Date, time: number) => {
  const newDate = new Date(date.getTime() + time);
  return newDate;
};

export const changeDate = (oldDate: Date, newDate: Date) => new Date(
  newDate.getFullYear(),
  newDate.getMonth(),
  newDate.getDate(),
  oldDate.getHours(),
  oldDate.getMinutes(),
  oldDate.getSeconds()
);

export const dateDiff = (newerDate: Date, olderDate: Date) => {
  const diff = new Date(newerDate).getTime() - new Date(olderDate).getTime();
  return diff;
};

export const getEndOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
