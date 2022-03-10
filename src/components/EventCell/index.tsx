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
import { eventReducer, initialState, SET_EVENT_INFOS, SET_TIMESTAMPED_INFOS } from './reducers/events';
import { cellReducer, initialCellStyle, SET_INTERNAL_HOUR_INFOS, SET_INTERVENTION_INFOS } from './reducers/cells';

interface TimeStampingProps {
  event: EventType,
}

const EventCell = ({ event }: TimeStampingProps) => {
  const [eventInfos, eventInfosDispatch] = useReducer(eventReducer, initialState);
  const [cellInfos, cellInfosDispatch] = useReducer(cellReducer, initialCellStyle);
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

  useEffect(() => {
    const payload = eventInfos;
    if (eventInfos.type === INTERVENTION) cellInfosDispatch({ type: SET_INTERVENTION_INFOS, payload });
    else cellInfosDispatch({ type: SET_INTERNAL_HOUR_INFOS, payload });
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
      <TouchableOpacity style={style.infoContainer} onPress={goToEventEdition}
        disabled={eventInfos.type !== INTERVENTION}>
        <View>
          <Text style={style.eventTitle}>{cellInfos.title}</Text>
          <View style={style.timeContainer}>
            {!!eventInfos.startDate &&
              <Text style={style.eventInfo}>{CompaniDate(eventInfos.startDate).format('HH:mm')}</Text>}
            {!!eventInfos.endDate &&
              <Text style={style.eventInfo}> - {CompaniDate(eventInfos.endDate).format('HH:mm')}</Text>}
          </View>
          <Text style={style.eventInfo}>{eventInfos.customer.address.toLocaleLowerCase()}</Text>
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
