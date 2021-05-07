import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';

export default {
  exists: async (params: { email: string }) => {
    const { baseURL } = getEnvVars();
    const exists = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });

    return exists.data.data.exists;
  },
  getById: async (id : string | null) => {
    const { baseURL } = getEnvVars();
    const user = await axiosLogged.get(`${baseURL}/users/${id}`);

    return user.data.data.user;
  },
  updatePassword: async (userId: string, data: object, token = '') => {
    const { baseURL } = getEnvVars();
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
};
