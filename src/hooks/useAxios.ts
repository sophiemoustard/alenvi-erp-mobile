import axios, { AxiosInstance } from 'axios';
import { useEffect, useRef } from 'react';

export const useAxios = () => {
  const toto = useRef<AxiosInstance | null>(null);

  useEffect(() => {
    const instance = axios.create();

    instance.interceptors.response.use(
      response => response,
      async error => Promise.reject(error.response)
    );

    toto.current = instance;
  }, []);

  return { toto };
};
