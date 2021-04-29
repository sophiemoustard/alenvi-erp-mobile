import axios, { AxiosInstance } from 'axios';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export const useAxios = () => {
  const axiosRef = useRef<AxiosInstance | null>(null);
  const { setMaintenanceModal } = useContext(AuthContext);

  useEffect(() => {
    const instance = axios.create();

    instance.interceptors.response.use(
      (response) => {
        setMaintenanceModal(false);
        return response;
      },
      async (error) => {
        if ([502, 503].includes(error.response.status)) setMaintenanceModal(true);
        return Promise.reject(error.response);
      }
    );

    axiosRef.current = instance;
  }, [setMaintenanceModal]);

  const callApi = useCallback(async (call: object) => {
    if (!axiosRef.current) return null;

    const res = await axiosRef.current(call);

    return res.data.data;
  }, []);

  return { callApi };
};
