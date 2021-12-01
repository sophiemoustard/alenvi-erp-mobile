import { descendingSortArray } from '../helpers/dates';

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

export const capitalizeFirstLetter = (s: string) => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;

export const formatWordToPlural = (items: any, text: string) => (items.length > 1 ? `${text}s` : `${text}`);

export const getLastVersion = (versions: any) => {
  if (versions.length === 0) return null;
  if (versions.length === 1) return { ...versions[0] };

  return descendingSortArray(versions, 'startDate')[0];
};

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
