import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  exists: async (params: { email: string }) => {
    const { baseURL } = getEnvVars();
    const exists = await axios.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
};
