import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { GRANTED } from '../../../core/data/constants';

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let finalStatus;
      const status = await BarCodeScanner.getPermissionsAsync();
      if (isActive && status !== GRANTED) finalStatus = await BarCodeScanner.requestPermissionsAsync();
      if (isActive && finalStatus !== GRANTED) openModal(); // modale de rejet, qu'on créé dans la suite
      if (isActive) setHasPermission(finalStatus === GRANTED);
      return () => { isActive = false; };
    }, [])
  );

  const openModal = () => {
    console.log('ici');
  };

  return (
    <View>
      <Text>Skusku</Text>
    </View>
  );
};

export default QRCodeScanner;
