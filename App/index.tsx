import React, { useEffect, useState } from 'react';
import { AppState, View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import Version from '../src/api/versions';
import { initializeAssets } from '../src/core/helpers/assets';
import AxiosUtils from '../src/api/axios/utils';
import { ACTIVE_STATE } from '../src/data/constants';
import UpdateAppModal from '../src/components/modals/UpdateAppModal';
import MaintenanceModal from '../src/components/modals/MaintenanceModal';
import Authentication from '../src/screens/Authentication';
import { WHITE } from '../src/styles/colors';
import styles from './styles';

const App = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [maintenanceModaleVisible, setMaintenanceModalVisible] = useState<boolean>(false);

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
    AxiosUtils.setUpAxiosInterceptors(setMaintenanceModalVisible);
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
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
      <MaintenanceModal visible={maintenanceModaleVisible} />
      <UpdateAppModal visible={updateAppVisible} />
      <Authentication />
    </>
  );
};

export default App;
