import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { Event } from '../types/EventTypeEnum';

export default {
  events: async (params: { auxiliary: string, startDate: Date, endDate: Date, type: Event }) => {
    const { baseURL } = getEnvVars();
    const events = await axiosLogged.get(`${baseURL}/events`, { params });
    return events.data.data.events;
  },
};
