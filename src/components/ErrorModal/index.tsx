import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface ErrorMessageProps {
  message: string,
}

const ErrorModal = ({ message } : ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default ErrorModal;
