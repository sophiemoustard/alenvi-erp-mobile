import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ORANGE } from '../../styles/colors';
import styles from './styles';

interface WarningBannerProps {
  text: string,
}

const WarningBanner = ({ text }: WarningBannerProps) => (
  <View style={styles.container}>
    <Feather name="alert-circle" size={24} color={ORANGE[700]} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default WarningBanner;
