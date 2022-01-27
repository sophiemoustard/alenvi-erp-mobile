import React from 'react';
import { View, Text } from 'react-native';
import { FeatherType } from '../../types/IconType';
import FeatherButton from '../FeatherButton';
import NiPrimaryButton from '../form/PrimaryButton';
import styles from './style';

type HeaderProps = {
  iconTitle: FeatherType,
  iconSize: number,
  iconColor: string,
  onPressIcon: () => void,
  buttonTitle?: string,
  onPressButton?: () => {}
  disabled?: boolean,
  loading?: boolean,
  title?: string,
};

const Header = ({
  iconTitle,
  iconSize,
  iconColor,
  onPressIcon,
  buttonTitle = '',
  onPressButton,
  disabled = false,
  loading = false,
  title = '',
}: HeaderProps) => (
  <View style={styles.container}>
    <FeatherButton name={iconTitle} onPress={onPressIcon} color={iconColor}
      size={iconSize} />
    <Text style={styles.title}>{title}</Text>
    {!disabled && !!buttonTitle &&
      <NiPrimaryButton onPress={onPressButton} title={buttonTitle} loading={loading} titleStyle={styles.buttonTitle}
        style={styles.button} />}
  </View>
);

export default Header;
