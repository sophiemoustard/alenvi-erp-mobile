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
  refreshToken: async (payload: { refreshToken: string | null }) => {
    const { baseURL } = getEnvVars();
    const refreshToken = await axios.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/forgot-password`, payload);
    return response.data.data.mailInfo;
  },
  passwordToken: async (email: string, token: string) => {
    const { baseURL } = getEnvVars();
    const checkToken = await axios.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
