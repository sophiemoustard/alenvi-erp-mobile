import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { AppState } from 'react-native';
import { AxiosRequestConfig, AxiosError } from 'axios';
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

  const handleApiUnavailability = (error: AxiosError) => {
    setMaintenanceModalVisible(true);
    return Promise.reject(error);
  };

  const initializeAxiosNotLogged = useCallback(() => {
    axiosNotLogged.interceptors.response.use(
      (response) => {
        setMaintenanceModalVisible(false);
        return response;
      },
      async (error: AxiosError) => {
        if (error?.response?.status === 502 || error?.response?.status === 503) return handleApiUnavailability(error);
        return Promise.reject(error);
      }
    );
  }, []);

  const handleUnauthorizedRequest = useCallback(async (error: AxiosError) => {
    const storedTokens = await asyncStorage.getCompaniToken();
    if (asyncStorage.isTokenValid(storedTokens.companiToken, storedTokens.companiTokenExpireDate)) {
      await signOut();
      return Promise.reject(error);
    } // handle invalid refreshToken reception from api whsich trigger infinite 401 calls

    await asyncStorage.removeCompaniToken();
    const { refreshToken } = await asyncStorage.getRefreshToken();
    await refreshCompaniToken(refreshToken);

    const refreshedStoredTokens = await asyncStorage.getCompaniToken();

    if (asyncStorage.isTokenValid(refreshedStoredTokens.companiToken, refreshedStoredTokens.companiTokenExpireDate)) {
      const config = { ...error.config };
      config.headers['x-access-token'] = refreshedStoredTokens.companiToken;
      return axiosLogged.request(config);
    }

    await signOut();
    return Promise.reject(error);
  }, [signOut, refreshCompaniToken]);

  const initializeAxiosLogged = useCallback(() => {
    if (axiosLoggedRequestInterceptorId.current !== null) {
      axiosLogged.interceptors.request.eject(axiosLoggedRequestInterceptorId.current);
    }

    axiosLoggedRequestInterceptorId.current = axiosLogged.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const newConfig = { ...config };
        newConfig.headers['x-access-token'] = companiToken;
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
        async (error: AxiosError) => {
          if (error?.response?.status === 401) return handleUnauthorizedRequest(error);
          if (error?.response?.status === 502 || error?.response?.status === 503) return handleApiUnavailability(error);
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
  }, [initializeAxiosNotLogged]);

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
