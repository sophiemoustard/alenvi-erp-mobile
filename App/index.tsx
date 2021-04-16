import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { initializeAssets } from '../src/core/helpers/assets';
import { WHITE } from '../src/styles/colors';
import styles from './styles';
import AppContainer from '../src/AppContainer';

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
      <AppContainer />
    </>
  );
};

export default App;
