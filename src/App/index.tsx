import { useState } from 'react';
import { View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { Provider as AuthProvider } from '../context/AuthContext';
import { initializeAssets } from '../core/helpers/assets';
import { WHITE } from '../styles/colors';
import styles from './styles';
import AppContainer from '../AppContainer';
import Environment from '../../environment';

Sentry.init({ dsn: Environment.getSentryKey(), debug: false });

const App = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

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
