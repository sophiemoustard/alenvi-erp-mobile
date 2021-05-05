import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { EventType } from '../types/EventType';

export default {
  events: async (params: { auxiliary: string, startDate: Date, endDate: Date, type: EventType }) => {
    const { baseURL } = getEnvVars();
    const events = await axiosLogged.get(`${baseURL}/events`, { params });
    return events.data.data.events;
  },
};
