import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import Version from '../api/Versions';
import { ACTIVE_STATE } from '../core/data/constants';
import UpdateAppModal from '../components/modals/UpdateAppModal';
import MaintenanceModal from '../components/modals/MaintenanceModal';
import AppNavigation from '../navigation/AppNavigation';

const AppContainer = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const [maintenanceModaleVisible, setMaintenanceModalVisible] = useState<boolean>(false);
  const [axiosInitialized, setAxiosInitialized] = useState<boolean>(false);

  const initializeAxios = () => {
    axios.interceptors.response.use(
      (response) => {
        setMaintenanceModalVisible(false);
        return response;
      },
      async error =>
        // if ([502, 503].includes(error.response.status)) setMaintenanceModalVisible(true);
        Promise.reject(error.response)

    );

    setAxiosInitialized(true);
  };

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
    initializeAxios();
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, []);

  if (!axiosInitialized) return null;

  return (
    <>
      <MaintenanceModal visible={maintenanceModaleVisible} />
      <UpdateAppModal visible={updateAppVisible} />
      <AppNavigation />
    </>
  );
};

export default AppContainer;
