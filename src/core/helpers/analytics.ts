import * as Analytics from 'expo-firebase-analytics';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { firebaseAndSentryAllowed } from './utils';

const logSessionStart = async () => {
  const { status } = await getTrackingPermissionsAsync();
  if (!firebaseAndSentryAllowed(status)) return;

  Analytics.logEvent('session_start');
};

const logScreenView = async (screen: string) => {
  const { status } = await getTrackingPermissionsAsync();
  if (!firebaseAndSentryAllowed(status)) return;

  Analytics.logEvent(
    'screen_view',
    {
      screen_name: screen,
      screen_class: screen,
      page_title: screen,
      firebase_screen_class: screen,
      firebase_screen: screen,
    }
  );
};

export default {
  logSessionStart,
  logScreenView,
};
