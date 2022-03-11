import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface ErrorCellProps {
  message: string,
  style?: Object,
}

const ErrorCell = ({ message, style }: ErrorCellProps) => (
  <View style={[styles.container, style]}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default ErrorCell;
