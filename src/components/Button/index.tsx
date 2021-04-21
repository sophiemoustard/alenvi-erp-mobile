import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import commonStyle from '../../styles/common';
import { WHITE } from '../../styles/colors';

interface ButtonProps {
  title: string,
  onPress: () => void,
  customStyles?: { button?: object, textButton?: object },
  disabled?: boolean,
  loading?: boolean,
}

const Button = ({ title, onPress, customStyles = {}, disabled = false, loading = false } : ButtonProps) => (
  <TouchableOpacity style={{ ...styles.button, ...customStyles.button }} onPress={onPress}
    disabled={loading || disabled}>
    {!loading && <Text style={{ ...styles.textButton, ...customStyles.textButton }}>{title}</Text>}
    {loading && <ActivityIndicator style={commonStyle.disabled} color={WHITE} size="small" />}
  </TouchableOpacity>
);

export default Button;
