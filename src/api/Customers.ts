import axiosLogged from './axios/logged';
import Environment from '../../environment';

type UpdatePayloadType = {
  followUp: { environment: string, objectives: string }
};

export default {
  getById: async (id : string) => {
    const baseURL = await Environment.getBaseUrl();
    const customer = await axiosLogged.get(`${baseURL}/customers/${id}`);

    return customer.data.data.customer;
  },
  updateById: async (id: string, payload: UpdatePayloadType) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/customers/${id}`, payload);
  },
};
