import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BLACK } from '../../styles/colors';
import { hitSlop, ICON } from '../../styles/metrics';
import { FeatherType } from '../../types/IconType';

interface FeatherButtonProps {
  name: FeatherType,
  onPress: () => void,
  color?: string,
  size?: number,
  style?: Object,
  disabled?: boolean,
}

const FeatherButton = ({
  name,
  onPress,
  color = BLACK,
  size = ICON.XS,
  style = {},
  disabled = false,
} : FeatherButtonProps) => (
  <TouchableOpacity style={style} onPress={onPress} hitSlop={hitSlop} disabled={disabled}>
    <Feather name={name} color={color} size={size} />
  </TouchableOpacity>
);

export default FeatherButton;
