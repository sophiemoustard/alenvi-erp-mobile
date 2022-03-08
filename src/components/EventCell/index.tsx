import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { TIMESTAMPING_ACTION_TYPE_LIST, GRANTED, INTERVENTION } from '../../core/data/constants';
import CompaniDate from '../../core/helpers/dates/companiDates';
import { EventType, EventHistoryType } from '../../types/EventType';
import CameraAccessModal from '../modals/CameraAccessModal';
import { COPPER, WHITE } from '../../styles/colors';
import { hitSlop, ICON } from '../../styles/metrics';
import styles, { eventCellStyleType } from './styles';

type EventStateType = {
  civility: string,
  lastName: string,
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
  lastName: '',
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
        lastName: action.payload.event?.customer?.identity?.lastname || '',
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
};

interface TimeStampingProps {
  event: EventType,
}

const EventCell = ({ event }: TimeStampingProps) => {
  const [eventInfos, eventInfosDispatch] = useReducer(eventReducer, initialState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEventStarting, setIsEventStarting] = useState<boolean>(true);
  const [style, setStyle] = useState<eventCellStyleType>(styles({ borderColor: WHITE, backgroundColor: WHITE }));
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

  const cellReducer = (state: cellStateType, action: cellActionType): cellStateType => {
    switch (action.type) {
      case SET_INTERVENTION_INFOS:
        return {
          title: `${eventInfos.firstname} ${eventInfos.lastName}`,
          borderColor: COPPER[100],
          backgroundColor: WHITE,
        };
      case SET_INTERNAL_HOUR_INFOS:
        return {
          title: eventInfos.internalHourName,
          borderColor: COPPER[400],
          backgroundColor: WHITE,
        };
      default:
        return state;
    }
  };

  const initialCellStyle = { title: '', backgroundColor: WHITE, borderColor: WHITE };

  const [cellInfos, cellInfosDispatch] = useReducer(cellReducer, initialCellStyle);

  useEffect(() => {
    if (eventInfos.type === INTERVENTION) cellInfosDispatch({ type: SET_INTERVENTION_INFOS });
    else cellInfosDispatch({ type: SET_INTERNAL_HOUR_INFOS });
  }, [eventInfos]);

  useEffect(() => setStyle(
    styles({ borderColor: cellInfos.borderColor, backgroundColor: cellInfos.backgroundColor })
  ), [cellInfos]);

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
    <View style={style.cell}>
      <TouchableOpacity style={style.infoContainer} onPress={goToEventEdition}>
        <View>
          <Text style={style.eventTitle}>{cellInfos.title}</Text>
          <View style={style.timeContainer}>
            {!!eventInfos.startDate &&
              <Text style={style.eventInfo}>{CompaniDate(eventInfos.startDate).format('HH:mm')}</Text>}
            {!!eventInfos.endDate &&
              <Text style={style.eventInfo}> - {CompaniDate(eventInfos.endDate).format('HH:mm')}</Text>}
          </View>
          <Text style={style.eventInfo}>{eventInfos.address.toLocaleLowerCase()}</Text>
        </View>
        {!eventInfos.endDateTimeStamp && eventInfos.type === INTERVENTION &&
        <TouchableOpacity hitSlop={hitSlop} style={style.iconContainer}
          onPress={() => (eventInfos?.startDateTimeStamp ? requestPermission(false) : requestPermission(true)) }>
          <MaterialIcons name="qr-code-2" size={ICON.LG} color={COPPER[500]} />
        </TouchableOpacity>}
      </TouchableOpacity>
      <CameraAccessModal visible={modalVisible} onRequestClose={() => setModalVisible(false)}
        onPressAskAgain={askPermissionAgain} goToManualTimeStamping={goToManualTimeStamping} />
    </View>
  );
};

export default EventCell;
