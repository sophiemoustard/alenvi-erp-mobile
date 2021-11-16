import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { DATE, IOS, TIME } from '../../../core/data/constants';
import { addTime, changeDate, dateDiff, formatDate, getEndOfDay } from '../../../core/helpers/dates';
import EventDateTime from '../../../components/EventDateTime';
import FeatherButton from '../../../components/FeatherButton';
import styles from './styles';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { EventType } from '../../../types/EventType';
import { NavigationType } from '../../../types/NavigationType';

export type ModeType = 'date' | 'time';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

interface StateType {
  startDate: Date,
  endDate: Date,
  mode: ModeType,
  displayStartPicker: boolean,
  displayEndPicker: boolean,
  start: boolean,
}

interface ActionType {
  type: string,
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}

const SWITCH_PICKER = 'switchPicker';
const HIDE_PICKER = 'hidePicker';
const SET_DATES = 'setDates';
const SET_TIME = 'setTime';

const reducer = (state: StateType, action: ActionType): StateType => {
  const changeEndHourOnStartHourChange = () => {
    const newDate = addTime(action.payload?.date || state.startDate, dateDiff(state.endDate, state.startDate));
    if (newDate.getDate() !== state.endDate.getDate()) return getEndOfDay(state.endDate);

    return newDate;
  };

  switch (action.type) {
    case SWITCH_PICKER:
      return {
        ...state,
        displayStartPicker: !!action.payload?.start,
        displayEndPicker: !action.payload?.start,
        mode: action.payload?.mode || DATE,
        start: !!action.payload?.start,
      };
    case HIDE_PICKER:
      return { ...state, displayStartPicker: false, displayEndPicker: false };
    case SET_DATES:
      return {
        ...state,
        startDate: changeDate(state.startDate, action.payload?.date || state.startDate),
        endDate: changeDate(state.endDate, action.payload?.date || state.endDate),
      };
    case SET_TIME:
      return {
        ...state,
        ...(state.start && {
          startDate: action.payload?.date,
          endDate: changeEndHourOnStartHourChange(),
        }),
        ...(!state.start && { endDate: action.payload?.date }),
      };
    default:
      return state;
  }
};

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  const initialState: StateType = {
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    mode: DATE,
    displayStartPicker: false,
    displayEndPicker: false,
    start: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const isIOS = Platform.OS === IOS;

  const goBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onPressPicker = (start: boolean, mode: ModeType) => dispatch({ type: SWITCH_PICKER, payload: { start, mode } });

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (state.mode === DATE) dispatch({ type: SET_DATES, payload: { date: newDate } });

    if (state.mode === TIME) dispatch({ type: SET_TIME, payload: { date: newDate } });

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
        <View style={styles.addressContainer}>
          <Feather name='map-pin' size={ICON.SM} color={COPPER_GREY[500]} />
          <View>
            <Text style={styles.addressText}>{`${event?.customer?.contact?.primaryAddress?.street}`}</Text>
            <Text style={styles.addressText}>
              {`${event?.customer?.contact?.primaryAddress?.zipCode} ${event?.customer?.contact?.primaryAddress?.city}`}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Début</Text>
          <EventDateTime date={state.startDate} isTimeStamped={event.startDateTimeStamp}
            onPress={(mode: ModeType) => onPressPicker(true, mode)} isBilled={event.isBilled} />
          {state.displayStartPicker && <DateTimePicker value={state.startDate} mode={state.mode} is24Hour locale="fr-FR"
            display="spinner" onChange={onChangePicker} />}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Fin</Text>
          <EventDateTime date={state.endDate} isTimeStamped={event.endDateTimeStamp} isBilled={event.isBilled}
            onPress={(mode: ModeType) => onPressPicker(false, mode)} />
          {state.displayEndPicker && <DateTimePicker value={state.endDate} mode={state.mode} is24Hour locale="fr-FR"
            display="spinner" onChange={onChangePicker} minimumDate={state.mode === TIME ? state.startDate : undefined}
          />}
        </View>
      </View>
    </View>
  );
};

export default EventEdition;
