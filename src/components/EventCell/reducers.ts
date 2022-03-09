import { formatIdentity } from '../../core/helpers/utils';
import { COPPER, WHITE } from '../../styles/colors';
import { EventType } from '../../types/EventType';

type EventStateType = {
  civility: string,
  lastname: string,
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
  lastname: '',
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
        lastname: action.payload.event?.customer?.identity?.lastname || '',
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

const SET_INTERVENTION_INFOS = 'set_intervention_infos';
const SET_INTERNAL_HOUR_INFOS = 'set_internal_hour_infos';

type cellStateType = {
  title: string,
  borderColor: string,
  backgroundColor: string,
};

type cellActionType = {
  type: string,
  payload: { eventInfos: EventStateType },
};

const initialCellStyle = { title: '', backgroundColor: WHITE, borderColor: WHITE };

const cellReducer = (state: cellStateType, action: cellActionType): cellStateType => {
  const identity = {
    firstname: action.payload?.eventInfos?.firstname,
    lastname: action.payload?.eventInfos?.lastname,
  };
  switch (action.type) {
    case SET_INTERVENTION_INFOS:
      return { title: formatIdentity(identity, 'FL'), borderColor: COPPER[100], backgroundColor: WHITE };
    case SET_INTERNAL_HOUR_INFOS:
      return { title: action.payload.eventInfos.internalHourName, borderColor: COPPER[400], backgroundColor: WHITE };
    default:
      return state;
  }
};

export {
  eventReducer,
  initialState,
  SET_EVENT_INFOS,
  SET_TIMESTAMPED_INFOS,
  EventStateType,
  cellReducer,
  initialCellStyle,
  SET_INTERVENTION_INFOS,
  SET_INTERNAL_HOUR_INFOS,
};
