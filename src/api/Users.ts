import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import Environment from '../../environment';

type userInfos = {
  identity? : { firstname: string, lastname: string },
  contact?: { phone: string },
  local?: { email: string },
}

export default {
  exists: async (params: { email: string }) => {
    const baseURL = await Environment.getBaseUrl({ email: params.email });
    const exists = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });

    return exists.data.data.exists;
  },
  getById: async (id : string | null) => {
    const baseURL = await Environment.getBaseUrl();
    const user = await axiosLogged.get(`${baseURL}/users/${id}`);

    return user.data.data.user;
  },
  updatePassword: async (userId: string, data: object, token = '') => {
    const baseURL = await Environment.getBaseUrl({ userId });
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
  setUser: async (userId: string | null, data: userInfos) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/users/${userId}`, data);
  },
};
