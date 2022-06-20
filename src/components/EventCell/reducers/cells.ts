import { formatIdentity } from '../../../core/helpers/utils';
import { COPPER, COPPER_GREY, WHITE } from '../../../styles/colors';
import { EventStateType } from './events';

const SET_INTERVENTION_INFOS = 'set_intervention_infos';
const SET_INTERNAL_HOUR_INFOS = 'set_internal_hour_infos';
const SET_UNAVAILABILITY_INFOS = 'set_unavailability_infos';

type cellStateType = {
  title: string,
  borderColor: string,
  backgroundColor: string,
};

type cellActionType = {
  type: string,
  payload: EventStateType,
};

const initialCellStyle = { title: '', backgroundColor: WHITE, borderColor: WHITE };

const cellReducer = (state: cellStateType, action: cellActionType): cellStateType => {
  const identity = {
    firstname: action.payload?.customer?.firstname,
    lastname: action.payload?.customer?.lastname,
  };
  switch (action.type) {
    case SET_INTERVENTION_INFOS:
      return { title: formatIdentity(identity, 'FL'), borderColor: COPPER[100], backgroundColor: WHITE };
    case SET_INTERNAL_HOUR_INFOS:
      return { title: action.payload.internalHourName, borderColor: COPPER[400], backgroundColor: WHITE };
    case SET_UNAVAILABILITY_INFOS:
      return { title: 'Indispo', borderColor: COPPER_GREY[400], backgroundColor: COPPER_GREY[100] };
    default:
      return state;
  }
};

export { cellReducer, initialCellStyle, SET_INTERVENTION_INFOS, SET_INTERNAL_HOUR_INFOS, SET_UNAVAILABILITY_INFOS };
