import React from 'react';
import { View, Text } from 'react-native';
import { COPPER } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import { FeatherType } from '../../types/IconType';
import FeatherButton from '../FeatherButton';
import NiPrimaryButton from '../form/PrimaryButton';
import styles from './style';

type HeaderProps = {
  onPressIcon: () => void,
  iconTitle?: FeatherType,
  iconSize?: number,
  iconColor?: string,
  buttonTitle?: string,
  onPressButton?: () => {}
  disabled?: boolean,
  loading?: boolean,
  title?: string,
};

const Header = ({
  onPressIcon,
  iconTitle = 'arrow-left',
  iconSize = ICON.MD,
  iconColor = COPPER[500],
  buttonTitle = 'Enregistrer',
  onPressButton,
  disabled = false,
  loading = false,
  title = '',
}: HeaderProps) => (
  <View style={styles.container}>
    <FeatherButton name={iconTitle} onPress={onPressIcon} color={iconColor} size={iconSize} />
    <Text style={styles.title}>{title}</Text>
    {!disabled &&
      <NiPrimaryButton onPress={onPressButton} title={buttonTitle} loading={loading} titleStyle={styles.buttonTitle}
        style={styles.button} />}
  </View>
);

export default Header;
