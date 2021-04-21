import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import commonStyle from '../../../styles/common';
import { PINK, WHITE } from '../../../styles/colors';

interface PrimaryButtonProps {
  title: string,
  onPress?: () => void,
  style?: Object,
  loading?: boolean,
  bgColor?: string,
  color?: string,
  disabled?: boolean,
}

const PrimaryButton = ({
  title,
  onPress = () => {},
  style = {},
  loading = false,
  bgColor = PINK[500],
  color = WHITE,
  disabled = false,
} : PrimaryButtonProps) => {
  const buttonStyle = { ...styles.button, backgroundColor: bgColor, borderColor: bgColor };

  return (
    <TouchableOpacity style={[style, buttonStyle]} onPress={onPress} disabled={loading || disabled}>
      {!loading && <Text style={{ ...styles.textButton, color }}>{title}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
