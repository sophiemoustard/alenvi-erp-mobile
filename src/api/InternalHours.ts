import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { InternalHoursType } from '../types/EventType';

export default {
  list: async (): Promise<InternalHoursType[]> => {
    const baseURL = await Environment.getBaseUrl();

    const internalHours = await axiosLogged.get(`${baseURL}/internalhours`);
    return internalHours.data.data.internalHours;
  },
};
