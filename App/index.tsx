import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AppLoading from 'expo-app-loading';
import Version from '../src/api/versions';
import { ACTIVE_STATE } from '../src/data/constants';
import UpdateAppModal from '../src/components/modals/UpdateAppModal';
import { initializeAssets } from '../src/core/helpers/assets';

const App = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  const shouldUpdate = async (nextState: string) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setUpdateAppVisible(mustUpdate);
      }
    } catch (e) {
      setUpdateAppVisible(false);
      console.error(e);
    }
  };

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, []);

  if (!isAppReady) {
    return <AppLoading startAsync={initializeAssets} onFinish={() => setIsAppReady(true)} onError={console.error} />;
  }

  return (
    <UpdateAppModal visible={updateAppVisible} />
  );
};

export default App;
