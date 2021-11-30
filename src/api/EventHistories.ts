import qs from 'qs';
import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  list: async (params: { eventId: string, action: string[], isCancelled: boolean }) => {
    const baseURL = await Environment.getBaseUrl();

    const eventhistories = await axiosLogged.get(
      `${baseURL}/eventhistories`,
      { params, paramsSerializer: param => qs.stringify(param, { indices: false }) }
    );
    return eventhistories.data.data.eventHistories;
  },
};
