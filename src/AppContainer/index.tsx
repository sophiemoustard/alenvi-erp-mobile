import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AppState } from 'react-native';
import Version from '../api/Versions';
import { ACTIVE_STATE } from '../core/data/constants';
import UpdateAppModal from '../components/modals/UpdateAppModal';
import MaintenanceModal from '../components/modals/MaintenanceModal';
import AppNavigation from '../navigation/AppNavigation';
import { Context as AuthContext } from '../context/AuthContext';
import { useAxios } from '../hooks/useAxios';

const AppContainer = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const { maintenanceModal } = useContext(AuthContext);
  const { callApi } = useAxios();

  const shouldUpdate = useCallback(async (nextState: string) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await callApi(Version.shouldUpdate());
        setUpdateAppVisible(mustUpdate);
      }
    } catch (e) {
      setUpdateAppVisible(false);
      console.error(e);
    }
  }, [callApi]);

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, [shouldUpdate]);

  return (
    <>
      <MaintenanceModal visible={maintenanceModal} />
      <UpdateAppModal visible={updateAppVisible} />
      <AppNavigation />
    </>
  );
};

export default AppContainer;
