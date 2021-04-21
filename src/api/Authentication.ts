import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data;
  },
  logOut: async () => {
    const { baseURL } = getEnvVars();
    await axios.post(`${baseURL}/users/logout`);
  },
};
