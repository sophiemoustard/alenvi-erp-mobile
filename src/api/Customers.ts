import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  getById: async (id : string) => {
    const baseURL = await Environment.getBaseUrl();
    const customer = await axiosLogged.get(`${baseURL}/customers/${id}`);

    return customer.data.data.customer;
  },
};
