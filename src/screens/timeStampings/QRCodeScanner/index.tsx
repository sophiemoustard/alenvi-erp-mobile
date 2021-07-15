import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GRANTED } from '../../../core/data/constants';
import styles from './styles';
import CameraAccessModal from '../../../components/modals/CameraAccessModal';

interface BarCodeType {
  type: string,
  data: string,
}

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

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

  return (hasPermission
    ? <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject} barCodeTypes={['org.iso.QRCode']} />
    : (
      <View style={styles.screen}>
        <CameraAccessModal visible={modalVisible} onPressDismiss={() => setModalVisible(false)}
          onPressAskAgain={askPermissionAgain} />
      </View>
    )
  );
};

export default QRCodeScanner;
