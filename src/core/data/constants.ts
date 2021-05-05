import { EventType } from '../../types/EventType';

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
export const INTERVENTION: EventType = 'intervention';
