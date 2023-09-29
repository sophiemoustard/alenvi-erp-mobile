import { useState, useEffect, useCallback } from 'react';
import * as Sentry from 'sentry-expo';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as AuthProvider } from '../context/AuthContext';
import { initializeAssets } from '../core/helpers/assets';
import AppContainer from '../AppContainer';
import Environment from '../../environment';

Sentry.init({ dsn: Environment.getSentryKey(), debug: false });

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initializeAssets();
      } catch (e) {
        console.error(e);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(
    async () => {
      if (isAppReady) await SplashScreen.hideAsync();
    },
    [isAppReady]
  );

  if (!isAppReady) return null;

  return (
    <AuthProvider>
      <AppContainer onLayout={onLayoutRootView}/>
    </AuthProvider>
  );
};

export default App;
