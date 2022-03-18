import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { ERROR, MANUAL_TIME_STAMPING, WARNING, GRANTED, TIME_STAMP_SWITCH_OPTIONS } from '../../../core/data/constants';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import NiSwitch from '../../../components/Switch';
import { hitSlop, ICON } from '../../../styles/metrics';
import { errorType } from '../../../types/ErrorType';
import styles from './styles';
import Events, { timeStampEventPayloadType } from '../../../api/Events';
import EventInfoCell from '../../../components/EventInfoCell';
import { COPPER_GREY } from '../../../styles/colors';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../reducers/error';

interface ManualTimeStampingProps {
  route: {
    params: {
      event: { _id: string, customer: { _id: string, identity: { title: string, lastname: string } } },
      timeStampStart: boolean,
      startDateTimeStamp: boolean,
    }
  },
}

const QRCODE_MISSING = 'qrcode_missing';
const QRCODE_ERROR = 'qrcode_error';
const CAMERA_ERROR = 'camera_error';

const optionList = [
  { label: 'Je n\'ai pas accès au code barre', value: QRCODE_MISSING },
  { label: 'Le code barre ne fonctionne pas', value: QRCODE_ERROR },
  { label: 'Mon appareil photo ne fonctionne pas', value: CAMERA_ERROR },
];

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [identity, setIdentity] = useState({ title: '', lastname: '' });
  const [reason, setReason] = useState<string | null>(null);
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<errorType>(ERROR);
  const [timeStampStart, setTimeStampStart] = useState<boolean>(route.params.timeStampStart);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setIdentity(route.params.event?.customer?.identity);
  }, [route.params.event]);

  const goBack = () => navigation.navigate('Home', { screen: 'Agenda' });

  const goToQRCodeScanner = useCallback(() => {
    navigation.navigate('QRCodeScanner', { ...route.params, timeStampStart });
  }, [navigation, route.params, timeStampStart]);

  const requestPermission = useCallback(async () => {
    let { status } = await Camera.getCameraPermissionsAsync();

    if (status !== GRANTED) {
      const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
      status = newStatus;
    }

    if (status === GRANTED) goToQRCodeScanner();
    else {
      Alert.alert(
        'Accès refusé',
        'Vérifiez que l\'application a bien l\'autorisation d\'accéder à l\'appareil photo.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  }, [goToQRCodeScanner]);

  const hardwareBackPress = useCallback(() => {
    requestPermission();
    return true;
  }, [requestPermission]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const timeStampEvent = async () => {
    try {
      setLoading(true);
      dispatchError({ type: RESET_ERROR });
      if (!reason) {
        setType(WARNING);
        dispatchError({ type: SET_ERROR, payload: 'Merci de selectionner une raison pour l\'horodatage manuel.' });
        return;
      }
      setType(ERROR);
      const payload: timeStampEventPayloadType = { action: MANUAL_TIME_STAMPING, reason };
      if (timeStampStart) payload.startDate = CompaniDate().toISO();
      else payload.endDate = CompaniDate().toISO();

      await Events.timeStampEvent(route.params?.event?._id, payload);
      goBack();
    } catch (e) {
      console.error(e);
      if ([409, 422].includes(e.response.status)) dispatchError({ type: SET_ERROR, payload: e.response.data.message });
      else if ([404, 403].includes(e.response.status)) {
        dispatchError({ type: SET_ERROR, payload: 'Vous ne pouvez pas horodater cet évènement.' });
      } else {
        dispatchError({ type: SET_ERROR, payload: 'Erreur, si le problème persiste, contactez le support technique.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = () => {
    if (route.params.startDateTimeStamp) setTimeStampStart(false);
    else setTimeStampStart(previousValue => !previousValue);
  };

  return (
    <View style={styles.screen}>
      <FeatherButton name='x-circle' onPress={goBack} size={ICON.MD} />
      <ScrollView style={styles.container}>
        <EventInfoCell identity={identity} />
        <NiSwitch options={TIME_STAMP_SWITCH_OPTIONS} backgroundColor={COPPER_GREY[100]} onChange={toggleSwitch}
          value={timeStampStart} unselectedTextColor={COPPER_GREY[500]} disabled={loading} />
        <View style={styles.reasons}>
          <Text style={styles.question}>Pourquoi horodatez-vous manuellement ?</Text>
          <NiRadioButtonList options={optionList} setOption={setReason} />
        </View>
        {error.value && <NiErrorMessage message={error.message} type={type} />}
      </ScrollView>
      <NiPrimaryButton title='Valider et horodater' onPress={timeStampEvent} loading={loading} />
      <TouchableOpacity onPress={requestPermission} hitSlop={hitSlop} >
        <Text style={styles.QRCodeTimeStampingButton}>Scanner le QR code avec l&apos;appareil photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManualTimeStamping;
