import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  getById: async (id : string) => {
    const baseURL = await Environment.getBaseUrl();
    const user = await axiosLogged.get(`${baseURL}/customers/${id}`);

    return user.data.data.customer;
  },
};
