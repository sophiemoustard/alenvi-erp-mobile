import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

interface ErrorMessageProps {
  message: string,
  visible: boolean,
}

const ErrorMessage = ({ message, visible }: ErrorMessageProps) => (
  <View>
    { visible && <Text style={styles.message}>{message}</Text>}
  </View>
);

export default ErrorMessage;
