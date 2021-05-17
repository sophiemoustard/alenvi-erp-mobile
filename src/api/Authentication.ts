import axiosNotLogged from './axios/notLogged';
import Environment from '../../environment';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const { baseURL } = Environment.getEnvVars();
    const response = await axiosNotLogged.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data;
  },
  logOut: async () => {
    const { baseURL } = Environment.getEnvVars();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  refreshToken: async (payload: { refreshToken: string | null }) => {
    const { baseURL } = Environment.getEnvVars();
    const refreshToken = await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const { baseURL } = Environment.getEnvVars();
    const response = await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);
    return response.data.data.mailInfo;
  },
  passwordToken: async (email: string, token: string) => {
    const { baseURL } = Environment.getEnvVars();
    const checkToken = await axiosNotLogged.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
