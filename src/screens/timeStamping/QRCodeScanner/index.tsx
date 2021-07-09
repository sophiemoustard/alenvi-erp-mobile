import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GRANTED } from '../../../core/data/constants';

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

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

  const openRejectionModal = () => {
    console.log('ici');
  };

  return (
    <View>
      {<Text>{hasPermission.toString()}</Text> }
    </View>
  );
};

export default QRCodeScanner;
