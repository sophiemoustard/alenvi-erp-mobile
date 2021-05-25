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
  disabled?: boolean,
}

const SecondaryButton = ({
  title,
  onPress = () => {},
  style = {},
  loading = false,
  disabled = false,
} : SecondaryButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={loading || disabled} testID={title}>
    {!loading && <Text style={styles.textButton}>{title}</Text>}
    {loading && <ActivityIndicator style={commonStyle.disabled} color={WHITE} size="small" />}
  </TouchableOpacity>
);

export default SecondaryButton;
