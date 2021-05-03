import Constants from 'expo-constants';
import axiosNotLogged from './axios/notLogged';
import getEnvVars from '../../environment';
import { ERP } from '../core/data/constants';

export default {
  shouldUpdate: async () => {
    const { baseURL } = getEnvVars();
    const params = { mobileVersion: Constants.manifest.version, appName: ERP };

    const response = await axiosNotLogged.get(`${baseURL}/version/should-update`, { params });
    return response.data.data;
  },
};
