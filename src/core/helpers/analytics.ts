import * as Analytics from 'expo-firebase-analytics';
import TrackingTransparency, { PermissionStatus } from 'expo-tracking-transparency';

const logSessionStart = async () => {
  const { status } = await TrackingTransparency.getTrackingPermissionsAsync();
  if (status !== PermissionStatus.GRANTED) return;

  Analytics.logEvent('session_start');
};

const logScreenView = async (screen: string) => {
  const { status } = await TrackingTransparency.getTrackingPermissionsAsync();
  if (status !== PermissionStatus.GRANTED) return;

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
