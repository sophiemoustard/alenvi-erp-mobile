import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../../core/helpers/dates';
import FeatherButton from '../../../components/FeatherButton';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';
import { COPPER } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { EventType } from '../../../types/EventType';
import EventDateTimeDetails from '../../../components/EventDateTimeDetails';

type ModeType = 'date' | 'time';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

interface StateType {
  startDate: Date,
  endDate: Date,
  mode: ModeType,
  showStartPicker: boolean,
  showEndPicker: boolean,
}
interface ActionType {
  type: string,
  payload?: { date?: Date, mode?: ModeType },
}

const SWITCH_PICKER = 'switchPicker';
const SET_MODE = 'setMode';
const SET_DATE = 'setDate';

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SWITCH_PICKER:
      if (state.showStartPicker) return { ...state, showStartPicker: false, showEndPicker: true };
      return { ...state, showStartPicker: true, showEndPicker: false };
    case SET_MODE:
      return { ...state, mode: action.payload?.mode || 'date' };
    case SET_DATE:
      return {
        ...state,
        startDate: action.payload?.date || state.startDate,
        endDate: action.payload?.date || state.endDate,
      };
    default:
      return state;
  }
};

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  const initialDate = new Date(event.startDate);
  const initialState: StateType = {
    startDate: initialDate,
    endDate: initialDate,
    mode: 'date',
    showStartPicker: false,
    showEndPicker: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const goBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onPressStartDatePicker = () => {
    if (!state.showStartPicker) dispatch({ type: SWITCH_PICKER });
    dispatch({ type: SET_MODE, payload: { mode: 'date' } });
  };

  const onPressStartTimePicker = () => {
    if (!state.showStartPicker) dispatch({ type: SWITCH_PICKER });
    dispatch({ type: SET_MODE, payload: { mode: 'time' } });
  };

  const onPressEndDatePicker = () => {
    if (!state.showEndPicker) dispatch({ type: SWITCH_PICKER });
    dispatch({ type: SET_MODE, payload: { mode: 'date' } });
  };

  const onPressEndTimePicker = () => {
    if (!state.showEndPicker) dispatch({ type: SWITCH_PICKER });
    dispatch({ type: SET_MODE, payload: { mode: 'time' } });
  };

  const onChangeStartPicker = (pickerEvent: any, newDate: Date | undefined) => {
    const value = newDate || initialDate;
    if (state.mode === 'date') dispatch({ type: SET_DATE, payload: { date: value } });
  };

  const onChangeEndPicker = (pickerEvent: any, newDate: Date | undefined) => {
    const value = newDate || initialDate;
    if (state.mode === 'date') dispatch({ type: SET_DATE, payload: { date: value } });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name='arrow-left' onPress={goBack} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.textButton}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>
          {`${event.customer?.identity?.firstname} ${event.customer?.identity?.lastname}`}
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Début</Text>
          <EventDateTimeDetails date={state.startDate} isTimeStamped={event.startDateTimeStamp}
            onPressDate={onPressStartDatePicker} onPressTime={onPressStartTimePicker} isBilled={event.isBilled} />
          { !!state.showStartPicker && <DateTimePicker value={state.startDate} mode={state.mode} is24Hour={true}
            display="default" onChange={onChangeStartPicker} dateFormat="dayofweek day month" />}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Fin</Text>
          <EventDateTimeDetails date={state.endDate} isTimeStamped={event.endDateTimeStamp} isBilled={event.isBilled}
            onPressDate={onPressEndDatePicker} onPressTime={onPressEndTimePicker} />
          { !!state.showEndPicker && <DateTimePicker value={state.endDate} mode={state.mode} is24Hour={true}
            display="default" onChange={onChangeEndPicker} dateFormat="dayofweek day month" />}
        </View>
      </View>
    </View>
  );
};

export default EventEdition;
