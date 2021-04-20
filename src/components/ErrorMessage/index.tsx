import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

interface ErrorMessageProps {
  message: string,
}

const ErrorMessage = ({ message } : ErrorMessageProps) => (
  <Text style={styles.message}>{message}</Text>
);

export default ErrorMessage;
