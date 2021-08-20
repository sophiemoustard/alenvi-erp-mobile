import axiosLogged from './axios/logged';
import axiosNotLogged from './axios/notLogged';
import Environment from '../../environment';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const response = await axiosNotLogged.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data;
  },
  logOut: async () => {
    const baseURL = await Environment.getBaseUrl();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  refreshToken: async (payload: { refreshToken: string | null }) => {
    const baseURL = await Environment.getBaseUrl();
    const refreshToken = await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const response = await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);
    return response.data.data.mailInfo;
  },
  passwordToken: async (email: string, token: string) => {
    const baseURL = await Environment.getBaseUrl({ email });
    const checkToken = await axiosNotLogged.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
  updatePassword: async (userId: string, data: object, token = '') => {
    const baseURL = await Environment.getBaseUrl({ userId });
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
};
