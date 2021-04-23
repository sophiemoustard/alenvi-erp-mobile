import Constants from 'expo-constants';
import getEnvVars from '../../environment';
import { ERP } from '../core/data/constants';

export default {
  shouldUpdate: () => {
    const { baseURL } = getEnvVars();

    return {
      method: 'GET',
      url: `${baseURL}/version/should-update`,
      params: { mobileVersion: Constants.manifest.version, appName: ERP },
    };
  },
};
