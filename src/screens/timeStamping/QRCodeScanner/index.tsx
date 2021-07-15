import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';
import { GRANTED } from '../../../core/data/constants';
import CameraAccessModal from '../../../components/modals/CameraAccessModal';
import FeatherButton from '../../../components/FeatherButton';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import CustomerTimeCell from '../../../components/CustomerTimeCell';

interface BarCodeType {
  type: string,
  data: string,
}

interface QRCodeScannerProps {
  route: { params: { event: { _id: string, customer: { identity: { title: string, lastname: string } } } } }
}

const QRCodeScanner = ({ route }: QRCodeScannerProps) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

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

  const handleBarCodeScanned = ({ data }: BarCodeType) => {
    setScanned(true);
    Alert.alert(
      'QR code scanné',
      `Le QR Code de ${data} est bien scanné.`,
      [{ text: 'OK', onPress: () => setModalVisible(false) }], { cancelable: false }
    );
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
    <>
      <BarCodeScanner onBarCodeScanned={scanned || !hasPermission ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]} barCodeTypes={['org.iso.QRCode']}>
        <View>
          <FeatherButton name='x-circle' onPress={goBack} size={ICON.LG} color={WHITE} style={styles.closeButton} />
          <Text style={styles.title}>{'Début de l\'intervention'}</Text>
          <CustomerTimeCell identity={route.params.event.customer.identity} style={styles.cell} />
        </View>
        <TouchableOpacity onPress={() => goToManualTimeStamping(true)}>
          <Text style={styles.manualTimeStampingButton}>Je ne peux pas scanner le QR code</Text>
        </TouchableOpacity>
        <CameraAccessModal visible={modalVisible} onPressDismiss={() => setModalVisible(false)}
          onPressAskAgain={askPermissionAgain} />
      </BarCodeScanner>
    </>
  );
};

export default QRCodeScanner;
