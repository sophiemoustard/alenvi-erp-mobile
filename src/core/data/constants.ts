import { Platform } from 'react-native';
import { EventTypeEnum } from '../../types/EventType';
import { OptionType } from '../../components/Switch';

export const ERP = 'erp';
export const IOS = 'ios';
export const isIOS = Platform.OS === IOS;

// STATE
export const ACTIVE_STATE = 'active';

export const PASSWORD = 'password';
export const EMAIL = 'email';
export const PHONE = 'phone';
export const MOBILE = 'mobile';
export const NUMBER = 'number';

// REGEX
export const EMAIL_REGEX = /^\s*[\w.+]+@([\w-]+\.)+[\w-]{2,4}\s*$/;
export const PHONE_REGEX = /^\s*(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}(?:[\s]*)$/;
export const FLOAT_REGEX = /^([0-9]+([.][0-9]+)?|[.][0-9]+)$/;

// DATE
export const DATE = 'date';
export const TIME = 'time';

// PLANNING
export const INTERVENTION: EventTypeEnum = 'intervention';
export const INTERNAL_HOUR: EventTypeEnum = 'internal_hour';

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

export const PUBLIC_TRANSPORT = 'public';
export const PRIVATE_TRANSPORT = 'private';
export const COMPANY_TRANSPORT = 'company_transport';
export const EVENT_TRANSPORT_OPTIONS = [
  { label: 'Transports en commun / À pied', value: PUBLIC_TRANSPORT },
  { label: 'Véhicule personnel', value: PRIVATE_TRANSPORT },
  { label: 'Véhicule d\'entreprise', value: COMPANY_TRANSPORT },
];

// ERROR
export const ERROR = 'error';
export const WARNING = 'warning';

// PERMISSIONS
export const GRANTED = 'granted';

// SWITCH OPTIONS
export const TIME_STAMP_SWITCH_OPTIONS: [OptionType, OptionType] = [
  { label: 'Début', value: true },
  { label: 'Fin', value: false },
];

// ROLE
export const AUXILIARY = 'auxiliary';
export const PLANNING_REFERENT = 'planning_referent';
