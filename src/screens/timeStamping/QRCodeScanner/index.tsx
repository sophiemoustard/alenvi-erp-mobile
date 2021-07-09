import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GRANTED } from '../../../core/data/constants';

interface BarCodeType {
  type: typeof BarCodeScanner.Constants.BarCodeType,
  data: string,
}

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let isActive = true;

        let { status: finalStatus } = await BarCodeScanner.getPermissionsAsync();

        if (isActive && finalStatus !== GRANTED) {
          const { status: newStatus } = await BarCodeScanner.requestPermissionsAsync();
          finalStatus = newStatus;
        }

        if (isActive && finalStatus !== GRANTED) openRejectionModal();

        if (isActive) setHasPermission(finalStatus === GRANTED);

        return () => { isActive = false; };
      })();
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }: BarCodeType) => {
    setScanned(true);
    console.log('qrcode', { type, data });
  };

  const openRejectionModal = () => {
    console.log('skusku');
  };

  return (
    <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject} />
  );
};

export default QRCodeScanner;
