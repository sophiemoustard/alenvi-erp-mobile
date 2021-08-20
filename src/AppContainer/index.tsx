import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { AppState } from 'react-native';
import { AxiosRequestConfig } from 'axios';
import axiosNotLogged from '../api/axios/notLogged';
import axiosLogged from '../api/axios/logged';
import Version from '../api/Versions';
import { Context as AuthContext } from '../context/AuthContext';
import { ACTIVE_STATE } from '../core/data/constants';
import asyncStorage from '../core/helpers/asyncStorage';
import UpdateAppModal from '../components/modals/UpdateAppModal';
import MaintenanceModal from '../components/modals/MaintenanceModal';
import AppNavigation from '../navigation/AppNavigation';

const AppContainer = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);
  const [maintenanceModaleVisible, setMaintenanceModalVisible] = useState<boolean>(false);
  const [axiosInitialized, setAxiosInitialized] = useState<boolean>(false);
  const axiosLoggedRequestInterceptorId = useRef<number | null>(null);
  const axiosLoggedResponseInterceptorId = useRef<number | null>(null);
  const { refreshLoggedUser, companiToken, signOut, refreshCompaniToken } = useContext(AuthContext);

  const handleUnauthorizedRequest = useCallback(async (error) => {
    await asyncStorage.removeCompaniToken();
    const { refreshToken } = await asyncStorage.getRefreshToken();
    await refreshCompaniToken(refreshToken);

    const { companiToken: newCompaniToken, companiTokenExpireDate } = await asyncStorage.getCompaniToken();

    if (asyncStorage.isTokenValid(newCompaniToken, companiTokenExpireDate)) {
      const config = { ...error.config };
      config.headers['x-access-token'] = newCompaniToken;
      return axiosLogged.request(config);
    }

    await signOut();
    return Promise.reject(error);
  }, [signOut, refreshCompaniToken]);

  const initializeAxiosNotLogged = () => {
    axiosNotLogged.interceptors.response.use(
      (response) => {
        setMaintenanceModalVisible(false);
        return response;
      },
      async (error) => {
        if ([502, 503].includes(error?.response?.status)) setMaintenanceModalVisible(true);
        return Promise.reject(error);
      }
    );
  };

  const initializeAxiosLogged = useCallback(() => {
    if (axiosLoggedRequestInterceptorId.current !== null) {
      axiosLogged.interceptors.request.eject(axiosLoggedRequestInterceptorId.current);
    }

    axiosLoggedRequestInterceptorId.current = axiosLogged.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const newConfig = { ...config };
        newConfig.headers.common['x-access-token'] = companiToken;
        return newConfig;
      },
      err => Promise.reject(err)
    );

    if (axiosLoggedResponseInterceptorId.current !== null) {
      axiosLogged.interceptors.response.eject(axiosLoggedResponseInterceptorId.current);
    }

    axiosLoggedResponseInterceptorId.current = axiosLogged.interceptors
      .response
      .use(
        response => response,
        async (error) => {
          if (error?.response?.status === 401) return handleUnauthorizedRequest(error);
          if ([502, 503].includes(error?.response?.status)) setMaintenanceModalVisible(true);

          return Promise.reject(error);
        }
      );
  }, [handleUnauthorizedRequest, companiToken]);

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

    initializeAxiosLogged();
    if (companiToken) refreshUser();
  }, [refreshLoggedUser, companiToken, initializeAxiosLogged]);

  useEffect(() => {
    initializeAxiosNotLogged();
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
