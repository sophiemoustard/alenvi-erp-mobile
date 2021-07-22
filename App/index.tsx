import React, { useState, useEffect } from 'react';
import { Platform, View, StatusBar } from 'react-native';
import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
  PermissionStatus,
} from 'expo-tracking-transparency';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import { initializeAssets } from '../src/core/helpers/assets';
import { WHITE } from '../src/styles/colors';
import styles from './styles';
import AppContainer from '../src/AppContainer';
import Environment from '../environment';
import Analytics from '../src/core/helpers/analytics';

const { sentryKey } = Environment.getEnvVars();
Sentry.init({ dsn: sentryKey, debug: false });

const App = () => {
  const [permissionStatus, setPermissionStatus] = useState<String>(PermissionStatus.UNDETERMINED);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function askPermission() {
      let { status } = await getTrackingPermissionsAsync();
      if (status === PermissionStatus.UNDETERMINED) {
        status = (await requestTrackingPermissionsAsync()).status;
      }
      setPermissionStatus(status);
    }

    const osVersion = parseInt(Platform.Version.toString().match(/\d*/)?.[0] || '0', 10);
    if (Platform.OS === 'ios' && osVersion >= 14) askPermission();
  }, []);

  useEffect(() => {
    async function startAnalytics() { await Analytics.logSessionStart(); }
    startAnalytics();
  }, [permissionStatus]);

  if (!isAppReady) {
    return <AppLoading startAsync={initializeAssets} onFinish={() => setIsAppReady(true)} onError={console.error} />;
  }

  const style = styles(StatusBar.currentHeight);

  return (
    <>
      <View style={style.statusBar}>
        <StatusBar translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </>
  );
};

export default App;
