import React, { useCallback, useState } from 'react';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { GRANTED, QR_CODE_TIME_STAMPING, WARNING } from '../../../core/data/constants';
import CameraAccessModal from '../../../components/modals/CameraAccessModal';
import FeatherButton from '../../../components/FeatherButton';
import CustomerTimeCell from '../../../components/CustomerTimeCell';
import NiErrorMessage from '../../../components/ErrorMessage';
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

const QRCodeScanner = ({ route }: QRCodeScannerProps) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const requestPermission = async () => {
        let { status: finalStatus } = await BarCodeScanner.getPermissionsAsync();

        if (isActive && finalStatus !== GRANTED) {
          const { status: newStatus } = await BarCodeScanner.requestPermissionsAsync();
          finalStatus = newStatus;
        }

        if (isActive && finalStatus !== GRANTED) setModalVisible(true);

        if (isActive) setHasPermission(finalStatus === GRANTED);
      };

      requestPermission();

      return () => { isActive = false; };
    }, [])
  );

  const handleBarCodeScanned = async ({ data, type }: BarCodeType) => {
    setScanned(true);
    try {
      setErrorMessage('');

      if (data !== route.params.event.customer._id || type !== 'org.iso.QRCode') {
        setErrorMessage('Le QR scanné ne correspond pas au bénéficiaire de l\'intervention');
        return setScanned(false);
      }

      const payload: timeStampEventPayloadType = { action: QR_CODE_TIME_STAMPING, startDate: new Date() };

      await Events.timeStampEvent(route.params?.event?._id, payload);

      return null;
    } catch (e) {
      console.error(e);

      setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
      return setScanned(false);
    }
  };

  const askPermissionAgain = async () => {
    const permission = await BarCodeScanner.requestPermissionsAsync();

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
    <BarCodeScanner onBarCodeScanned={scanned || !hasPermission ? undefined : handleBarCodeScanned}
      style={styles.container} barCodeTypes={['org.iso.QRCode']}>
      <View>
        <FeatherButton name='x-circle' onPress={goBack} size={ICON.LG} color={WHITE} style={styles.closeButton} />
        <Text style={styles.title}>{'Début de l\'intervention'}</Text>
        <CustomerTimeCell identity={route.params.event.customer.identity} style={styles.cell} />
      </View>
      {!!errorMessage && <NiErrorMessage message={errorMessage} type={WARNING} />}
      <TouchableOpacity onPress={() => goToManualTimeStamping(true)}>
        <Text style={styles.manualTimeStampingButton}>Je ne peux pas scanner le QR code</Text>
      </TouchableOpacity>
      <CameraAccessModal visible={modalVisible} onPressDismiss={() => setModalVisible(false)}
        onPressAskAgain={askPermissionAgain} />
    </BarCodeScanner>
  );
};

export default QRCodeScanner;
