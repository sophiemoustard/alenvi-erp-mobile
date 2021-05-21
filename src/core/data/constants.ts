import { EventTypeEnum } from '../../types/EventType';

export const ERP = 'erp';

// STATE
export const ACTIVE_STATE = 'active';

export const PASSWORD = 'password';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const MOBILE = 'mobile';

// REGEX
export const EMAIL_REGEX = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/;

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

// EVENT

export const MANUAL_TIME_STAMPING = 'manual_time_stamping';
