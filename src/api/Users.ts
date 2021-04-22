import { AxiosInstance } from 'axios';
import getEnvVars from '../../environment';

export default {
  exists: async (axios: AxiosInstance, params: { email: string }) => {
    const { baseURL } = getEnvVars();
    console.log('custom axios', axios);
    const exists = await axios.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
};
