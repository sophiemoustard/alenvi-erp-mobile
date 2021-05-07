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
export const CIVILITY_OPTIONS = {
  MISTER: 'mr',
  MRS: 'mrs',
  COUPLE: 'couple',
  get CIVILITY_LIST() {
    return {
      [this.MISTER]: 'M.',
      [this.MRS]: 'Mme',
      [this.COUPLE]: 'Mme et M.',
    };
  },
};
