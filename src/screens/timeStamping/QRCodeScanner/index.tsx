import React, { useCallback, useState, useReducer } from 'react';
import { View, Alert, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { GRANTED, QR_CODE_TIME_STAMPING } from '../../../core/data/constants';
import CameraAccessModal from '../../../components/modals/CameraAccessModal';
import FeatherButton from '../../../components/FeatherButton';
import EventInfoCell from '../../../components/EventInfoCell';
import NiErrorCell from '../../../components/ErrorCell';
import Events, { timeStampEventPayloadType } from '../../../api/Events';

interface BarCodeType {
  type: string,
  data: string,
}

interface QRCodeScannerProps {
  route: {
    params: {
      event: { _id: string, customer: { _id: string, identity: { title: string, lastname: string } } }
    },
  }
}

interface StateType {
  errorMessage: string,
  scanned: boolean,
  loading: boolean,
}
interface ActionType {
  type: string,
  payload?: { errorMessage: string },
}

const SCANNING = 'scanning';
const WRONG_QR_CODE = 'wrong_qr_code';
const BAD_REQUEST = 'bad_request';

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SCANNING:
      return { loading: true, scanned: true, errorMessage: '' };
    case WRONG_QR_CODE:
      return {
        loading: false,
        scanned: false,
        errorMessage: 'Le QR code scanné ne correspond pas au bénéficiaire de l\'intervention',
      };
    case BAD_REQUEST:
      return { loading: false, scanned: true, errorMessage: action.payload?.errorMessage || '' };
    default:
      return state;
  }
};

const QRCodeScanner = ({ route }: QRCodeScannerProps) => {
  const [state, dispatch] = useReducer(reducer, { errorMessage: '', scanned: false, loading: false });
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const requestPermission = async () => {
        let { status } = await Camera.getPermissionsAsync();

        if (isActive && status !== GRANTED) {
          const { status: newStatus } = await Camera.requestPermissionsAsync();
          status = newStatus;
        }

        if (isActive && status !== GRANTED) setModalVisible(true);

        if (isActive) setHasPermission(status === GRANTED);
      };

      requestPermission();

      return () => { isActive = false; };
    }, [])
  );

  const handleBarCodeScanned = async ({ data }: BarCodeType) => {
    dispatch({ type: SCANNING });
    try {
      if (data !== route.params.event.customer._id) {
        dispatch({ type: WRONG_QR_CODE });
        return;
      }

      const payload: timeStampEventPayloadType = { action: QR_CODE_TIME_STAMPING, startDate: new Date() };
      await Events.timeStampEvent(route.params?.event?._id, payload);

      goBack();
    } catch (e) {
      if ([409, 422].includes(e.response.status)) {
        dispatch({ type: BAD_REQUEST, payload: { errorMessage: e.response.data.message } });
      } else if ([404, 403].includes(e.response.status)) {
        dispatch({ type: BAD_REQUEST, payload: { errorMessage: 'Vous ne pouvez pas horodater cet évènement.' } });
      } else {
        dispatch({
          type: BAD_REQUEST,
          payload: { errorMessage: 'Erreur, si le problème persiste, contactez le support technique.' },
        });
      }
    }
  };

  const askPermissionAgain = async () => {
    const permission = await Camera.requestPermissionsAsync();

    if (!permission.canAskAgain) {
      await Alert.alert(
        'Accès refusé',
        'Vérifiez que l\'application a bien l\'autorisation d\'accéder à l\'appareil photo.',
        [{ text: 'OK', onPress: () => setModalVisible(false) }], { cancelable: false }
      );
    }

    if (permission.status !== GRANTED) setModalVisible(true);

    setHasPermission(permission.status === GRANTED);
  };

  const goBack = () => navigation.navigate('Home');

  const goToManualTimeStamping = (eventStart: boolean) => {
    navigation.navigate('ManualTimeStamping', { event: route.params.event, eventStart });
  };

  return (
    <Camera onBarCodeScanned={!hasPermission || state.scanned || state.loading ? undefined : handleBarCodeScanned}
      style={styles.container} barCodeScannerSettings={{ barCodeTypes: ['org.iso.QRCode'] }}
      type={Camera.Constants.Type.back}>
      <View>
        <FeatherButton name='x-circle' onPress={goBack} size={ICON.LG} color={WHITE} style={styles.closeButton} />
        <Text style={styles.title}>{'Début de l\'intervention'}</Text>
        <EventInfoCell identity={route.params.event.customer.identity} style={styles.cell} />
      </View>
      <View>
        {state.loading && <ActivityIndicator color={WHITE} size="small" />}
        {!!state.errorMessage && <NiErrorCell message={state.errorMessage} />}
        <TouchableOpacity onPress={() => goToManualTimeStamping(true)}>
          <Text style={styles.manualTimeStampingButton}>Je ne peux pas scanner le QR code</Text>
        </TouchableOpacity>
      </View>
      <CameraAccessModal visible={modalVisible} onPressDismiss={() => setModalVisible(false)}
        onPressAskAgain={askPermissionAgain} />
      <View style={styles.backgroundContainer}>
        <Image source={{ uri: 'https://storage.googleapis.com/compani-main/qr-code-background.png' }}
          style={styles.background}/>
      </View>
    </Camera>
  );
};

export default QRCodeScanner;
