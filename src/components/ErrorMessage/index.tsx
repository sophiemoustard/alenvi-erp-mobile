import React from 'react';
import { Text } from 'react-native';
import styles from './style';

interface ErrorMessageProps {
  message: string,
  color?: string,
}

const ErrorMessage = ({ message, color } : ErrorMessageProps) => (
  <Text style={{ ...styles.message, color }}>{message}</Text>
);

export default ErrorMessage;
