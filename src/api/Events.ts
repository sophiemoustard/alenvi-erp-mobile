import axiosLogged from './axios/logged';
import Environment from '../../environment';

export type timeStampEventPayloadType = { action: string, reason?: string, startDate?: string, endDate?: string };
type updateEventsPayloadType = { auxiliary: string, startDate: string, endDate: string, kmDuringEvent: number };
type getEventsQueryType = { auxiliary: string, startDate: string, endDate: string, isCancelled: boolean };

export default {
  list: async (params: getEventsQueryType) => {
    const baseURL = await Environment.getBaseUrl();
    const events = await axiosLogged.get(`${baseURL}/events`, { params });
    return events.data.data.events;
  },
  timeStampEvent: async (id: string, payload: timeStampEventPayloadType) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/events/${id}/timestamping`, payload);
  },
  updateById: async (eventId: string, payload: updateEventsPayloadType) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/events/${eventId}`, payload);
  },
};
