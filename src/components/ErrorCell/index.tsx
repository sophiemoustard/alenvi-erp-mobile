import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface ErrorCellProps {
  message: string,
}

const ErrorCell = ({ message }: ErrorCellProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default ErrorCell;
