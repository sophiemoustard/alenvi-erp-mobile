import { DAYS, MONTHS } from '../data/constants';

type DateProps = Date | string | null;

const createDate = (date: DateProps) => (date ? new Date(date) : new Date());

export const isBefore = (date1: DateProps, date2: DateProps) => createDate(date1) < createDate(date2);

export const formatDate = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth();
  return `${DAYS[day]} ${date.getDate()} ${MONTHS[month]}`;
};

export const formatTime = (date: Date) => `${date.getHours()}:${displayMinutes(date)}`;

export const displayMinutes = (date: Date) => {
  if (date.getMinutes() < 10) return '0'.concat(date.getMinutes().toString());
  return date.getMinutes();
};
