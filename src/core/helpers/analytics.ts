import * as Analytics from 'expo-firebase-analytics';

const logSessionStart = async () => Analytics.logEvent('session_start');

const logScreenView = (screen: string) => Analytics.logEvent(
  'screen_view',
  {
    screen_name: screen,
    screen_class: screen,
    page_title: screen,
    firebase_screen_class: screen,
    firebase_screen: screen,
  }
);

export default {
  logSessionStart,
  logScreenView,
};
