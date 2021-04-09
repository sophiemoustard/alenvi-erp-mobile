import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface ButtonProps {
  title: string,
  onPress: () => void,
}

const Button = ({ title, onPress } : ButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.textButton}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
