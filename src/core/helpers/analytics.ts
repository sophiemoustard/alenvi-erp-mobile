import * as Analytics from 'expo-firebase-analytics';
import { Platform } from 'react-native';
import { getTrackingPermissionsAsync, PermissionStatus } from 'expo-tracking-transparency';

const logSessionStart = async () => {
  const osVersion = parseInt(Platform.Version.toString().match(/\d*/)?.[0] || '0', 10);
  if (Platform.OS === 'ios' && osVersion >= 14) {
    const { status } = await getTrackingPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) return;
  }

  Analytics.logEvent('session_start');
};

const logScreenView = async (screen: string) => {
  const osVersion = parseInt(Platform.Version.toString().match(/\d*/)?.[0] || '0', 10);
  if (Platform.OS === 'ios' && osVersion >= 14) {
    const { status } = await getTrackingPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) return;
  }

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
