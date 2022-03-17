import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { HelperType } from '../types/HelperType';

export default {
  list: async (params: { customer: string }): Promise<HelperType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const helpers = await axiosLogged.get(`${baseURL}/helpers`, { params });
    return helpers.data.data.helpers;
  },
  updateById: async (helperId: string, data: { referent: boolean }) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/helpers/${helperId}`, data);
  },
};
