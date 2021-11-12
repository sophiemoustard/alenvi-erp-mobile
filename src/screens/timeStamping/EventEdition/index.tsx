import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform } from 'react-native';
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
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}

const SWITCH_PICKER = 'switchPicker';
const HIDE_PICKER = 'hidePicker';
const SET_DATE = 'setDate';

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SWITCH_PICKER:
      if (action.payload?.start) {
        return { ...state, showStartPicker: true, showEndPicker: false, mode: action.payload?.mode || 'date' };
      }
      return { ...state, showStartPicker: false, showEndPicker: true, mode: action.payload?.mode || 'date' };
    case HIDE_PICKER:
      return { ...state, showStartPicker: false, showEndPicker: false };
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
  const isIOS = Platform.OS === 'ios';

  const goBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onPressDatePicker = (start: boolean) => dispatch({ type: SWITCH_PICKER, payload: { start, mode: 'date' } });

  const onPressTimePicker = (start: boolean) => dispatch({ type: SWITCH_PICKER, payload: { start, mode: 'time' } });

  const onChangeStartPicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (state.mode === 'date') dispatch({ type: SET_DATE, payload: { date: newDate } });
    if (!isIOS) dispatch({ type: HIDE_PICKER });
  };

  const onChangeEndPicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (state.mode === 'date') dispatch({ type: SET_DATE, payload: { date: newDate } });
    if (!isIOS) dispatch({ type: HIDE_PICKER });
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
            onPressDate={() => onPressDatePicker(true)} onPressTime={() => onPressTimePicker(true)}
            isBilled={event.isBilled} />
          { !!state.showStartPicker && <DateTimePicker value={state.startDate} mode={state.mode} is24Hour={true}
            display="default" onChange={onChangeStartPicker} dateFormat="dayofweek day month" />}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Fin</Text>
          <EventDateTimeDetails date={state.endDate} isTimeStamped={event.endDateTimeStamp} isBilled={event.isBilled}
            onPressDate={() => onPressDatePicker(false)} onPressTime={() => onPressTimePicker(false)} />
          { !!state.showEndPicker && <DateTimePicker value={state.endDate} mode={state.mode} is24Hour={true}
            display="default" onChange={onChangeEndPicker} dateFormat="dayofweek day month" />}
        </View>
      </View>
    </View>
  );
};

export default EventEdition;
