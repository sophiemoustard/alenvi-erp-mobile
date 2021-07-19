import React from 'react';
import { Text } from 'react-native';
import { ERROR } from '../../core/data/constants';
import { errorType } from '../../types/ErrorType';
import styles from './styles';

interface ErrorMessageProps {
  message: string,
  type?: errorType,
}

const ErrorMessage = ({ message, type = ERROR }: ErrorMessageProps) => (
  <Text style={styles(type).message}>{message}</Text>
);

export default ErrorMessage;
