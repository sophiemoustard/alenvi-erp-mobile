import React, { useEffect, useReducer } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { formatTime } from '../../core/helpers/dates';
import { CIVILITY_OPTIONS, MANUAL_TIME_STAMPING } from '../../core/data/constants';
import styles from './styles';
import { EventType, EventHistoryType } from '../../types/EventType';
import NiPrimaryButton from '../form/PrimaryButton';
import NiSecondaryButton from '../form/SecondaryButton';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';

interface StateType {
  civility: string,
  lastName: string,
  startDate: Date | null,
  endDate: Date | null,
  startHourStamped: boolean,
  endHourStamped: boolean,
}
interface ActionType {
  type: string,
  payload: { event?: EventType, timeStampingHistories?: EventHistoryType[] }
}

const initialState = {
  civility: '',
  lastName: '',
  startDate: null,
  endDate: null,
  startHourStamped: false,
  endHourStamped: false,
};
const SET_EVENT_INFOS = 'setEventInfos';
const SET_TIMESTAMPED_INFOS = 'setTimeStampedInfos';

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SET_EVENT_INFOS:
      return {
        ...state,
        civility: action.payload.event?.customer?.identity?.title || '',
        lastName: action.payload.event?.customer?.identity?.lastname || '',
        startDate: new Date(action.payload.event?.startDate || ''),
        endDate: new Date(action.payload.event?.endDate || ''),
      };
    case SET_TIMESTAMPED_INFOS:
      return {
        ...state,
        startHourStamped: action.payload?.timeStampingHistories?.some((h: EventHistoryType) => !!h.update.startHour) ||
          false,
        endHourStamped: action.payload?.timeStampingHistories?.some((h: EventHistoryType) => !!h.update.endHour) ||
          false,
      };
    default:
      return initialState;
  }
};

const renderTimeStamp = () => (
  <View style={styles.timeStampingContainer}>
    <View style={styles.iconContainer}>
      <Feather name='check' size={ICON.XS} color={WHITE} />
    </View>
    <Text style={styles.timeStamping}>Horodaté</Text>
  </View>
);

interface TimeStampingProps {
  event: EventType,
}

const TimeStampingCell = ({ event }: TimeStampingProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  useEffect(() => { if (event) dispatch({ type: SET_EVENT_INFOS, payload: { event } }); }, [event]);

  useEffect(() => {
    if (event.histories) {
      const timeStampingHistories = event.histories.filter((h: EventHistoryType) => h.action === MANUAL_TIME_STAMPING);

      dispatch({ type: SET_TIMESTAMPED_INFOS, payload: { timeStampingHistories } });
    }
  }, [event.histories]);

  const goToManualTimeStamping = (eventStart: boolean) => {
    navigation.navigate(
      'ManualTimeStamping',
      { event: { _id: event._id, customer: { identity: event.customer.identity } }, eventStart }
    );
  };

  const goToBarCodeScanner = () => navigation.navigate('QRCodeScanner');

  return (
    <View style={styles.cell}>
      <Text style={styles.title}>{CIVILITY_OPTIONS[state.civility]} {state.lastName.toUpperCase()}</Text>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Début</Text>
          {!!state.startDate && <Text style={styles.scheduledTime}>{formatTime(state.startDate)}</Text>}
        </View>
        {state.startHourStamped
          ? renderTimeStamp()
          : <>
            {!state.endHourStamped &&
              <NiPrimaryButton title='Commencer' style={styles.button}
                onPress={() => (__DEV__ ? goToBarCodeScanner() : goToManualTimeStamping(true))}/>}
          </>}
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Fin</Text>
          {!!state.endDate && <Text style={styles.scheduledTime}>{formatTime(state.endDate)}</Text>}
        </View>
        {state.endHourStamped
          ? renderTimeStamp()
          : <>
            {!state.startHourStamped &&
              <NiSecondaryButton title='Terminer' onPress={() => goToManualTimeStamping(false)}
                style={styles.button} />}
            {state.startHourStamped &&
              <NiPrimaryButton title='Terminer' onPress={() => goToManualTimeStamping(false)} style={styles.button} />}
          </>}
      </View>
    </View>
  );
};

export default TimeStampingCell;
