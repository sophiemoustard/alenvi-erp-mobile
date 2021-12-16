import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { EventTypeEnum } from '../types/EventType';

export type timeStampEventPayloadType = { action: string, reason?: string, startDate?: Date, endDate?: Date };

export default {
  list: async (params: {
    auxiliary: string,
    startDate: Date,
    endDate: Date,
    type: EventTypeEnum,
    isCancelled: boolean
  }) => {
    const baseURL = await Environment.getBaseUrl();
    const events = await axiosLogged.get(`${baseURL}/events`, { params });
    return events.data.data.events;
  },
  timeStampEvent: async (id: string, data: timeStampEventPayloadType) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/events/${id}/timestamping`, data);
  },
  updateById: async (
    eventId: string,
    data: { auxiliary: string, startDate: Date, endDate: Date, kmDuringEvent: number }
  ) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/events/${eventId}`, data);
  },
};
