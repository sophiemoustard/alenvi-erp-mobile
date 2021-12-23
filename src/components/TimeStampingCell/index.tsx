import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { CIVILITY_OPTIONS, TIMESTAMPING_ACTION_TYPE_LIST, GRANTED } from '../../core/data/constants';
import CompaniDate from '../../core/helpers/dates/companiDates';
import { EventType, EventHistoryType } from '../../types/EventType';
import CameraAccessModal from '../../components/modals/CameraAccessModal';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import NiPrimaryButton from '../form/PrimaryButton';
import NiSecondaryButton from '../form/SecondaryButton';
import styles from './styles';

interface StateType {
  civility: string,
  lastName: string,
  startDate: Date | null,
  endDate: Date | null,
  startDateTimeStamp: boolean,
  endDateTimeStamp: boolean,
}
interface ActionType {
  type: string,
  payload: { event?: EventType, startDateTimeStamp?: boolean, endDateTimeStamp?: boolean },
}

const initialState = {
  civility: '',
  lastName: '',
  startDate: null,
  endDate: null,
  startDateTimeStamp: false,
  endDateTimeStamp: false,
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
        startDate: action.payload.event?.startDate || null,
        endDate: action.payload.event?.endDate || null,
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
  const [eventInfos, eventInfosDispatch] = useReducer(reducer, initialState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEventStarting, setIsEventStarting] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => { if (event) eventInfosDispatch({ type: SET_EVENT_INFOS, payload: { event } }); }, [event]);

  useEffect(() => {
    if (event.histories) {
      const timeStampingHistories = event.histories
        .filter((h: EventHistoryType) => TIMESTAMPING_ACTION_TYPE_LIST.includes(h.action) && !h.isCancelled);

      eventInfosDispatch({
        type: SET_TIMESTAMPED_INFOS,
        payload: {
          startDateTimeStamp: timeStampingHistories?.some((h: EventHistoryType) => !!h.update.startHour) || false,
          endDateTimeStamp: timeStampingHistories?.some((h: EventHistoryType) => !!h.update.endHour) || false,
        },
      });
    }
  }, [event.histories]);

  const goToBarCodeScanner = (eventStart: boolean) => navigation.navigate(
    'QRCodeScanner',
    { event: { _id: event._id, customer: { _id: event.customer._id, identity: event.customer.identity } }, eventStart }
  );

  const goToManualTimeStamping = () => {
    setModalVisible(false);
    return (
      navigation.navigate(
        'ManualTimeStamping',
        {
          event: { _id: event._id, customer: { _id: event.customer._id, identity: event.customer.identity } },
          eventStart: isEventStarting,
        }
      )
    );
  };

  const goToEventEdition = () => navigation.navigate(
    'EventEdition',
    {
      event: {
        ...event,
        startDateTimeStamp: eventInfos.startDateTimeStamp,
        endDateTimeStamp: eventInfos.endDateTimeStamp,
      },
    }
  );

  const requestPermission = async (eventStart: boolean) => {
    setIsEventStarting(eventStart);
    let { status } = await Camera.getCameraPermissionsAsync();

    if (status !== GRANTED) {
      const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
      status = newStatus;
    }

    if (status === GRANTED) goToBarCodeScanner(eventStart);

    setModalVisible(status !== GRANTED);
  };

  const askPermissionAgain = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();

    if (!permission.canAskAgain) {
      Alert.alert(
        'Accès refusé',
        'Vérifiez que l\'application a bien l\'autorisation d\'accéder à l\'appareil photo.',
        [{ text: 'OK', onPress: () => setModalVisible(false) }],
        { cancelable: false }
      );
      return;
    }

    setModalVisible(permission.status !== GRANTED);
  };

  return (
    <View style={styles.cell}>
      <CameraAccessModal visible={modalVisible} onRequestClose={() => setModalVisible(false)}
        onPressAskAgain={askPermissionAgain} goToManualTimeStamping={goToManualTimeStamping} />
      <TouchableOpacity onPress={goToEventEdition}>
        <Text style={styles.title}>{CIVILITY_OPTIONS[eventInfos.civility]} {eventInfos.lastName.toUpperCase()}</Text>
        <View style={styles.sectionDelimiter} />
        <View style={styles.container}>
          <View>
            <Text style={styles.timeTitle}>Début</Text>
            {!!eventInfos.startDate &&
              <Text style={styles.scheduledTime}>{CompaniDate(eventInfos.startDate).format('HH:mm')}</Text>}
          </View>
          {eventInfos.startDateTimeStamp
            ? renderTimeStamp()
            : <>
              {!eventInfos.endDateTimeStamp &&
                <NiPrimaryButton title='Commencer' style={styles.button} onPress={() => requestPermission(true)} />}
            </>}
        </View>
        <View style={styles.sectionDelimiter} />
        <View style={styles.container}>
          <View>
            <Text style={styles.timeTitle}>Fin</Text>
            {!!eventInfos.endDate &&
              <Text style={styles.scheduledTime}>{CompaniDate(eventInfos.endDate).format('HH:mm')}</Text>}
          </View>
          {eventInfos.endDateTimeStamp
            ? renderTimeStamp()
            : <>
              {!eventInfos.startDateTimeStamp &&
                <NiSecondaryButton title='Terminer' onPress={() => requestPermission(false)} style={styles.button} />}
              {!!eventInfos.startDateTimeStamp &&
                <NiPrimaryButton title='Terminer' onPress={() => requestPermission(false)} style={styles.button} />}
            </>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimeStampingCell;
