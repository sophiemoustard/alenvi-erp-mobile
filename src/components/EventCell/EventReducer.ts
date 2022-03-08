import { EventType } from '../../types/EventType';

type EventStateType = {
  civility: string,
  lastName: string,
  firstname: string,
  startDate: string | null,
  endDate: string | null,
  startDateTimeStamp: boolean,
  endDateTimeStamp: boolean,
  address: string,
  type: string,
  internalHourName: string,
};

type EventActionType = {
  type: string,
  payload: { event?: EventType, startDateTimeStamp?: boolean, endDateTimeStamp?: boolean },
};

const initialState = {
  civility: '',
  lastName: '',
  firstname: '',
  startDate: null,
  endDate: null,
  startDateTimeStamp: false,
  endDateTimeStamp: false,
  address: '',
  type: '',
  internalHourName: '',
};
const SET_EVENT_INFOS = 'setEventInfos';
const SET_TIMESTAMPED_INFOS = 'setTimeStampedInfos';

const eventReducer = (state: EventStateType, action: EventActionType): EventStateType => {
  switch (action.type) {
    case SET_EVENT_INFOS:
      return {
        ...state,
        civility: action.payload.event?.customer?.identity?.title || '',
        lastName: action.payload.event?.customer?.identity?.lastname || '',
        firstname: action.payload.event?.customer?.identity?.firstname || '',
        startDate: action.payload.event?.startDate || null,
        endDate: action.payload.event?.endDate || null,
        address: action.payload.event?.customer?.contact?.primaryAddress?.street ||
          action.payload.event?.address?.street ||
          '',
        type: action.payload.event?.type || '',
        internalHourName: action.payload.event?.internalHour?.name || '',
      };
    case SET_TIMESTAMPED_INFOS:
      return {
        ...state,
        startDateTimeStamp: action.payload.startDateTimeStamp || false,
        endDateTimeStamp: action.payload.endDateTimeStamp || false,
      };
    default:
      return state;
  }
};

export { eventReducer, initialState, SET_EVENT_INFOS, SET_TIMESTAMPED_INFOS };
