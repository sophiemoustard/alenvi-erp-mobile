import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import commonStyle from '../../../styles/common';
import { WHITE } from '../../../styles/colors';

interface PrimaryButtonProps {
  title: string,
  onPress?: () => void,
  style?: Object,
  titleStyle?: Object,
  loading?: boolean,
  disabled?: boolean,
}

const PrimaryButton = ({
  title,
  onPress = () => {},
  style = {},
  titleStyle = {},
  loading = false,
  disabled = false,
} : PrimaryButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={loading || disabled} testID={title}>
    {!loading && <Text style={[styles.textButton, titleStyle]}>{title}</Text>}
    {loading && <ActivityIndicator style={commonStyle.disabled} color={WHITE} size="small" />}
  </TouchableOpacity>
);

export default PrimaryButton;
