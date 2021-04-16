import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface ButtonProps {
  title: string,
  onPress: () => void,
  style?: object,
}

const Button = ({ title, onPress, style = {} } : ButtonProps) => (
  <TouchableOpacity style={{ ...style, ...styles.button }} onPress={onPress}>
    <Text style={styles.textButton}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
