import React, { useReducer } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DATE, isIOS, TIME } from '../../core/data/constants';
import {
  EventEditionActionType,
  EventEditionStateType,
  ModeType,
  SET_DATES,
  SET_START,
  SET_TIME,
} from '../../screens/timeStamping/EventEdition';
import { EventType } from '../../types/EventType';
import EventDateTime from '../EventDateTime';
import styles from './styles';

interface EventDateTimeEditionProps {
  event: EventType,
  eventEditionState: EventEditionStateType,
  eventEditionDispatch: (action: EventEditionActionType) => void,
  dateDisabled?: boolean,
  timeDisabled?: boolean,
}

interface StateType {
  mode: ModeType,
  displayStartPicker: boolean,
  displayEndPicker: boolean,
}

interface ActionType {
  type: string,
  payload?: { mode: ModeType, startPickerSelected: boolean },
}

const initialState: StateType = {
  mode: DATE,
  displayStartPicker: false,
  displayEndPicker: false,
};

const SWITCH_PICKER = 'switchPicker';
const HIDE_PICKER = 'hidePicker';

const reducer = (state: StateType, action: ActionType): StateType => {
  const isSamePayload = state.displayStartPicker === !!action.payload?.startPickerSelected &&
    state.displayEndPicker === !action.payload?.startPickerSelected && state.mode === action.payload?.mode;

  switch (action.type) {
    case SWITCH_PICKER:
      if (isIOS && isSamePayload) return { ...state, displayStartPicker: false, displayEndPicker: false };

      return {
        ...state,
        displayStartPicker: !!action.payload?.startPickerSelected,
        displayEndPicker: !action.payload?.startPickerSelected,
        mode: action.payload?.mode || DATE,
      };
    case HIDE_PICKER:
      return { ...state, displayStartPicker: false, displayEndPicker: false };
    default:
      return state;
  }
};

const EventDateTimeEdition = ({
  event,
  eventEditionState,
  eventEditionDispatch,
}: EventDateTimeEditionProps) => {
  const dateDisabled = event.startDateTimeStamp || event.endDateTimeStamp || event.isBilled;
  const [picker, pickerDispatch] = useReducer(reducer, initialState);

  const onPressPicker = (start: boolean, mode: ModeType) => {
    eventEditionDispatch({ type: SET_START, payload: { start } });
    pickerDispatch({ type: SWITCH_PICKER, payload: { startPickerSelected: start, mode } });
  };

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (!newDate) return;

    if (picker.mode === DATE) eventEditionDispatch({ type: SET_DATES, payload: { date: newDate } });

    if (picker.mode === TIME) eventEditionDispatch({ type: SET_TIME, payload: { date: newDate } });

    if (!isIOS) pickerDispatch({ type: HIDE_PICKER });
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Début</Text>
        <EventDateTime isTimeStamped={event.startDateTimeStamp} date={eventEditionState.startDate}
          dateDisabled={dateDisabled} onPress={(mode: ModeType) => onPressPicker(true, mode)}
          timeDisabled={event.startDateTimeStamp || event.isBilled} />
        {picker.displayStartPicker && <DateTimePicker value={eventEditionState.startDate} mode={picker.mode}
          is24Hour locale="fr-FR" display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker}
          maximumDate={(picker.mode === TIME && event.endDateTimeStamp) ? eventEditionState.endDate : undefined} />}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Fin</Text>
        <EventDateTime isTimeStamped={event.endDateTimeStamp} onPress={(mode: ModeType) => onPressPicker(false, mode)}
          date={eventEditionState.endDate} timeDisabled={event.endDateTimeStamp || event.isBilled}
          dateDisabled={dateDisabled} />
        {picker.displayEndPicker && <DateTimePicker value={eventEditionState.endDate} mode={picker.mode} is24Hour
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} locale="fr-FR"
          minimumDate={picker.mode === TIME ? eventEditionState.startDate : undefined} />}
      </View>
    </>
  );
};

export default EventDateTimeEdition;
