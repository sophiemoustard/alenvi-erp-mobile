import axiosLogged from './axios/logged';
import Environment from '../../environment';

type UpdatePayloadType = { isCancelled: boolean, timeStampCancellationReason: string };

export default {
  list: async (params: { eventId: string }) => {
    const baseURL = await Environment.getBaseUrl();
    const eventhistories = await axiosLogged.get(`${baseURL}/eventhistories`, { params });

    return eventhistories.data.data.eventHistories;
  },
  updateById: async (eventHistoryId: string, payload: UpdatePayloadType) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.put(`${baseURL}/eventhistories/${eventHistoryId}`, payload);
  },
};
