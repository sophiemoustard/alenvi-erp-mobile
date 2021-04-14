import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BLACK } from '../../styles/colors';
import { ICON } from '../../styles/metrics';

interface FeatherButtonProps {
  name: 'eye' | 'eye-off',
  color?: string,
  size?: number,
  style?: Object,
  onPress: () => void,
}

const FeatherButton = ({ name, color = BLACK, size = ICON.XS, style, onPress } : FeatherButtonProps) => (
  <TouchableOpacity style={style} onPress={onPress} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
    <Feather name={name} color={color} size={size} />
  </TouchableOpacity>
);

export default FeatherButton;
