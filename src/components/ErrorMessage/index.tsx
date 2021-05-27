import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ORANGE, RED } from '../../styles/colors';
import { errorType } from '../../types/ErrorType';
import styles from './styles';

interface ErrorMessageProps {
  message: string,
  type?: errorType,
}

const ErrorMessage = ({ message, type = 'error' } : ErrorMessageProps) => {
  const [color, setColor] = useState<string>(RED);

  useEffect(() => {
    if (type === 'warning') setColor(ORANGE[500]);
  }, [color, type]);

  return <Text style={{ ...styles.message, color }}>{message}</Text>;
};

export default ErrorMessage;
