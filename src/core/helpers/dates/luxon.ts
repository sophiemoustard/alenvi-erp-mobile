import luxon from 'luxon';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/fr';

luxon.Settings.defaultLocale = 'fr';
luxon.Settings.defaultZone = 'Europe/Paris';
luxon.Settings.throwOnInvalid = true;

export default luxon;
