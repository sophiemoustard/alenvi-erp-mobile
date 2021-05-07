import { Event } from '../../types/EventTypeEnum';

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
export const INTERVENTION: Event = 'intervention';

// CIVILITY

export const MISTER = 'mr';
export const MRS = 'mrs';
export const COUPLE = 'couple';

export const CIVILITY_OPTIONS = [
  { label: 'M.', value: 'mr' },
  { label: 'Mme', value: 'mrs' },
  { label: 'Mme et M.', value: 'couple' },
];
