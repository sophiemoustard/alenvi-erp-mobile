import React, { useEffect, useReducer, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { formatTime } from '../../core/helpers/dates';
import { CIVILITY_OPTIONS, GRANTED } from '../../core/data/constants';
import styles from './styles';
import { EventType } from '../../types/EventType';
import CameraAccessModal from '../../components/modals/CameraAccessModal';
import NiPrimaryButton from '../form/PrimaryButton';
import NiSecondaryButton from '../form/SecondaryButton';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';

interface StateType {
  civility: string,
  lastName: string,
  startDate: Date | null,
  endDate: Date | null,
}
interface ActionType {
  type: string,
  payload: { event?: EventType },
}

const initialState = {
  civility: '',
  lastName: '',
  startDate: null,
  endDate: null,
};
const SET_EVENT_INFOS = 'setEventInfos';

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SET_EVENT_INFOS:
      return {
        ...state,
        civility: action.payload.event?.customer?.identity?.title || '',
        lastName: action.payload.event?.customer?.identity?.lastname || '',
        startDate: action.payload.event?.startDate ? new Date(action.payload.event?.startDate) : null,
        endDate: action.payload.event?.endDate ? new Date(action.payload.event?.endDate) : null,
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEventStarting, setIsEventStarting] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => { if (event) dispatch({ type: SET_EVENT_INFOS, payload: { event } }); }, [event]);

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

  const goToEventEdition = () => navigation.navigate('EventEdition', { event });

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
        [{ text: 'OK', onPress: () => setModalVisible(false) }], { cancelable: false }
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
        <Text style={styles.title}>{CIVILITY_OPTIONS[state.civility]} {state.lastName.toUpperCase()}</Text>
        <View style={styles.sectionDelimiter} />
        <View style={styles.container}>
          <View>
            <Text style={styles.timeTitle}>Début</Text>
            {!!state.startDate && <Text style={styles.scheduledTime}>{formatTime(state.startDate)}</Text>}
          </View>
          {event.startDateTimeStamp
            ? renderTimeStamp()
            : <>
              {!event.endDateTimeStamp &&
                <NiPrimaryButton title='Commencer' style={styles.button} onPress={() => requestPermission(true)} />}
            </>}
        </View>
        <View style={styles.sectionDelimiter} />
        <View style={styles.container}>
          <View>
            <Text style={styles.timeTitle}>Fin</Text>
            {!!state.endDate && <Text style={styles.scheduledTime}>{formatTime(state.endDate)}</Text>}
          </View>
          {event.endDateTimeStamp
            ? renderTimeStamp()
            : <>
              {!event.startDateTimeStamp &&
                <NiSecondaryButton title='Terminer' onPress={() => requestPermission(false)} style={styles.button} />}
              {!!event.startDateTimeStamp &&
                <NiPrimaryButton title='Terminer' onPress={() => requestPermission(false)} style={styles.button} />}
            </>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimeStampingCell;
