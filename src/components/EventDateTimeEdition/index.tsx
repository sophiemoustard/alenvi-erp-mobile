import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DATE, IOS, TIME } from '../../core/data/constants';
import {
  EventEditionActionType,
  EventEditionStateType,
  HIDE_PICKER,
  ModeType,
  SET_DATES,
  SET_TIME,
  SWITCH_PICKER
} from '../../screens/timeStamping/EventEdition';
import { EventType } from '../../types/EventType';
import EventDateTime from '../EventDateTime';
import styles from './styles';

interface EventDateTimeEditionProps {
  event: EventType,
  state: EventEditionStateType,
  dispatch: (action: EventEditionActionType) => void,
  dateDisabled?: boolean,
  timeDisabled?: boolean,
}

const EventDateTimeEdition = ({
  event,
  state,
  dispatch,
}: EventDateTimeEditionProps) => {
  const [displayStartPicker, setDisplayStartPicker] = useState<boolean>(false);
  const [displayEndPicker, setDisplayEndPicker] = useState<boolean>(false);
  const isIOS = Platform.OS === IOS;
  const dateDisabled = event.startDateTimeStamp || event.endDateTimeStamp || event.isBilled;

  const onPressPicker = (start: boolean, mode: ModeType) => dispatch({ type: SWITCH_PICKER, payload: { start, mode } });

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (!newDate) return;

    if (state.mode === DATE) dispatch({ type: SET_DATES, payload: { date: newDate } });

    if (state.mode === TIME) dispatch({ type: SET_TIME, payload: { date: newDate } });

    if (!isIOS) dispatch({ type: HIDE_PICKER });
  };

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Début</Text>
        <EventDateTime isTimeStamped={event.startDateTimeStamp} date={state.startDate} dateDisabled={dateDisabled}
          onPress={(mode: ModeType) => onPressPicker(true, mode)}
          timeDisabled={event.startDateTimeStamp || event.isBilled} />
        {state.displayStartPicker && <DateTimePicker value={state.startDate} mode={state.mode}
          is24Hour locale="fr-FR" display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker}
          maximumDate={(state.mode === TIME && event.endDateTimeStamp) ? state.endDate : undefined} />}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Fin</Text>
        <EventDateTime isTimeStamped={event.endDateTimeStamp} onPress={(mode: ModeType) => onPressPicker(false, mode)}
          date={state.endDate} dateDisabled={dateDisabled} timeDisabled={event.endDateTimeStamp || event.isBilled} />
        {state.displayEndPicker && <DateTimePicker value={state.endDate} mode={state.mode} is24Hour
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} locale="fr-FR"
          minimumDate={state.mode === TIME ? state.startDate : undefined} />}
      </View>
    </View>
  );
};

export default EventDateTimeEdition;
