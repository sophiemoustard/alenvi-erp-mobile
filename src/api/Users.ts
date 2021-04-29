import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  exists: async (params: { email: string }) => {
    const { baseURL } = getEnvVars();
    const exists = await axios.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
  getById: async (id : string | null) => {
    const { baseURL } = getEnvVars();
    const user = await axios.get(`${baseURL}/users/${id}`);
    return user.data.data.user;
  },
};
