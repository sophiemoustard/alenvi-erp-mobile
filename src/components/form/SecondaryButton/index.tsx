import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import commonStyle from '../../../styles/common';
import { WHITE } from '../../../styles/colors';

interface SecondaryButtonProps {
  title: string,
  onPress?: () => void,
  style?: Object,
  loading?: boolean,
  color?: string,
  disabled?: boolean,
}

const SecondaryButton = ({
  title,
  onPress = () => {},
  style = {},
  loading = false,
  color = WHITE,
  disabled = false,
} : SecondaryButtonProps) => {
  const buttonStyle = { ...styles.button, borderColor: color };

  return (
    <TouchableOpacity style={[style, buttonStyle]} onPress={onPress} disabled={loading || disabled}>
      {!loading && <Text style={{ ...styles.textButton, color }}>{title}</Text>}
      {loading && <ActivityIndicator style={commonStyle.disabled} color={color} size="small" />}
    </TouchableOpacity>
  );
};

export default SecondaryButton;
