import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { AppState } from 'react-native';
import { AxiosRequestConfig } from 'axios';
import axiosNotLogged from '../api/axios/notLogged';
import axiosLogged from '../api/axios/logged';
import Version from '../api/Versions';
import { ACTIVE_STATE } from '../core/data/constants';
import UpdateAppModal from '../components/modals/UpdateAppModal';
import MaintenanceModal from '../components/modals/MaintenanceModal';
import AppNavigation from '../navigation/AppNavigation';
import { Context as AuthContext } from '../context/AuthContext';

const AppContainer = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const [maintenanceModaleVisible, setMaintenanceModalVisible] = useState<boolean>(false);
  const [axiosInitialized, setAxiosInitialized] = useState<boolean>(false);
  const loggedAxiosInterceptorId = useRef<number | null>(null);
  const { refreshLoggedUser, companiToken, signOut } = useContext(AuthContext);

  const initializeNotLoggedAxios = () => {
    axiosNotLogged.interceptors.response.use(
      (response) => {
        setMaintenanceModalVisible(false);
        return response;
      },
      async (error) => {
        if ([502, 503].includes(error.response.status)) setMaintenanceModalVisible(true);
        return Promise.reject(error.response);
      }
    );
  };

  const initializeLoggedAxios = useCallback((token: string | null) => {
    if (loggedAxiosInterceptorId.current !== null) {
      axiosLogged.interceptors.request.eject(loggedAxiosInterceptorId.current);
    }

    loggedAxiosInterceptorId.current = axiosLogged.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const newConfig = { ...config };
        newConfig.headers.common['x-access-token'] = token;
        return newConfig;
      },
      err => Promise.reject(err)
    );

    loggedAxiosInterceptorId.current = axiosLogged.interceptors
      .response
      .use(
        response => response,
        async (error) => {
          if (error?.response?.status === 401) return signOut();
          return Promise.reject(error);
        }
      );
  }, [signOut]);

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
    const refreshUser = async () => {
      try {
        await refreshLoggedUser();
      } catch (e) {
        console.error(e);
      }
    };

    initializeLoggedAxios(companiToken);
    if (companiToken) refreshUser();
  }, [refreshLoggedUser, companiToken, initializeLoggedAxios]);

  useEffect(() => {
    initializeNotLoggedAxios();
    setAxiosInitialized(true);
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
