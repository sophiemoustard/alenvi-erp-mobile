import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
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
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function startAnalytics() { await Analytics.logSessionStart(); }
    startAnalytics();
  }, []);

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
