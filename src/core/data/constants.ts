import { EventTypeEnum } from '../../types/EventType';

export const ERP = 'erp';

// STATE
export const ACTIVE_STATE = 'active';

export const PASSWORD = 'password';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const MOBILE = 'mobile';

// REGEX
export const EMAIL_REGEX = /^\s*[\w.+]+@([\w-]+\.)+[\w-]{2,4}\s*$/;
export const PHONE_REGEX = /^\s*(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}(?:[\s]*)$/;

// DATE
export const ONE_YEAR_IN_MILLISECONDS = 31536000000;

// PLANNING
export const INTERVENTION: EventTypeEnum = 'intervention';

// CIVILITY
export const MISTER : string = 'mr';
export const MRS : string = 'mrs';
export const COUPLE : string = 'couple';
export const CIVILITY_OPTIONS = {
  [MISTER]: 'M.',
  [MRS]: 'Mme',
  [COUPLE]: 'Mme et M.',
};

// DATE
export const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
export const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre',
  'novembre', 'décembre'];
export const MONTHS_SHORT = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.',
  'déc.'];

// EVENT
export const MANUAL_TIME_STAMPING = 'manual_time_stamping';
export const QR_CODE_TIME_STAMPING = 'qr_code_time_stamping';
export const TIMESTAMPING_ACTION_TYPE_LIST = [MANUAL_TIME_STAMPING, QR_CODE_TIME_STAMPING];

// ERROR
export const ERROR = 'error';
export const WARNING = 'warning';

// PERMISSIONS
export const GRANTED = 'granted';
