import { EventType } from '../../types/EventType';
import CompaniDate from './dates/companiDates';

export const formatPhone = (phoneNumber : any) => (phoneNumber
  ? phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5') : '');

export const formatPhoneForPayload = (phoneNumber: Number) => (phoneNumber
  ? phoneNumber.toString()
    .replace('+33', '0')
    .replace('0033', '0')
    .replace(/[\s\-.]/g, '')
    .trim()
  : '');

export const formatEmailForPayload = (email: string) => email.trim();

export const capitalizeFirstLetter = (s: string) => `${s.charAt(0).toUpperCase()}${s.substring(1)}`;

export const formatWordToPlural = (items: any, text: string) => (items.length > 1 ? `${text}s` : `${text}`);

export const formatIdentity = (identity: any, format: string) => {
  if (!identity) return '';
  const formatLower = format.toLowerCase();
  const values = [];

  for (let i = 0; i < format.length; i += 1) {
    let value;
    if (formatLower[i] === 'f') value = (identity.firstname || '').trim();
    else if (formatLower[i] === 'l') value = (identity.lastname || '').trim().toUpperCase();

    if (!value) continue;

    if (formatLower[i] === format[i]) value = `${value.charAt(0).toUpperCase()}.`;
    values.push(value);
  }

  return values.join(' ');
};

export const ascendingSortArray = (array: EventType[], key: 'startDate') => [...array]
  .sort((a, b) => (CompaniDate(a[key]).isBefore(b[key]) ? -1 : 1));
