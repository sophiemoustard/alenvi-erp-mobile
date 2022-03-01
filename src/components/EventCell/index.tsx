import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TIMESTAMPING_ACTION_TYPE_LIST, GRANTED } from '../../core/data/constants';
import CompaniDate from '../../core/helpers/dates/companiDates';
import { EventType, EventHistoryType } from '../../types/EventType';
import CameraAccessModal from '../modals/CameraAccessModal';
import { COPPER, WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import NiPrimaryButton from '../form/PrimaryButton';
import NiSecondaryButton from '../form/SecondaryButton';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';

interface StateType {
  civility: string,
  lastName: string,
  firstname: string,
  startDate: string | null,
  endDate: string | null,
  startDateTimeStamp: boolean,
  endDateTimeStamp: boolean,
  address: string,
}
interface ActionType {
  type: string,
  payload: { event?: EventType, startDateTimeStamp?: boolean, endDateTimeStamp?: boolean },
}

const initialState = {
  civility: '',
  lastName: '',
  firstname: '',
  startDate: null,
  endDate: null,
  startDateTimeStamp: false,
  endDateTimeStamp: false,
  address: '',
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
        firstname: action.payload.event?.customer?.identity?.firstname || '',
        startDate: action.payload.event?.startDate || null,
        endDate: action.payload.event?.endDate || null,
        address: action.payload.event?.customer?.contact?.primaryAddress?.street || '',
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

const EventCell = ({ event }: TimeStampingProps) => {
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

  const goToBarCodeScanner = (timeStampStart: boolean) => navigation.navigate(
    'QRCodeScanner',
    {
      event: { _id: event._id, customer: { _id: event.customer._id, identity: event.customer.identity } },
      timeStampStart,
      startDateTimeStamp: eventInfos.startDateTimeStamp,
    }
  );

  const goToManualTimeStamping = () => {
    setModalVisible(false);
    return (
      navigation.navigate(
        'ManualTimeStamping',
        {
          event: { _id: event._id, customer: { _id: event.customer._id, identity: event.customer.identity } },
          timeStampStart: isEventStarting,
          startDateTimeStamp: eventInfos.startDateTimeStamp,
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

  const requestPermission = async (timeStampStart: boolean) => {
    setIsEventStarting(timeStampStart);
    let { status } = await Camera.getCameraPermissionsAsync();

    if (status !== GRANTED) {
      const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
      status = newStatus;
    }

    if (status === GRANTED) goToBarCodeScanner(timeStampStart);

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
      <TouchableOpacity style={styles.infoContainer} onPress={goToEventEdition}>
        <View>
          <Text style={styles.title}>{eventInfos.firstname} {eventInfos.lastName}</Text>
          <View style={styles.timeContainer}>
            {!!eventInfos.startDate &&
              <Text style={styles.scheduledTime}>{CompaniDate(eventInfos?.startDate).format('HH:mm')}</Text>}
            {!!eventInfos.endDate &&
              <Text style={styles.scheduledTime}> - {CompaniDate(eventInfos?.endDate).format('HH:mm')}</Text>}
          </View>
          <Text>{eventInfos.address.toLocaleLowerCase()}</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="qr-code-2" size={ICON.MD} color={COPPER[500]}
            onPress={() => requestPermission(isEventStarting)}/>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default EventCell;
