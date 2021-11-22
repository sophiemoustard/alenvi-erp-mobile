import { Platform, StyleSheet } from 'react-native';
import { IOS } from '../src/core/data/constants';
import { WHITE } from '../src/styles/colors';

const styles = (StatusBarHeight: number = 20) => {
  const STATUS_BAR_HEIGHT = Platform.OS === IOS ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: 'flex',
      backgroundColor: WHITE,
      height: STATUS_BAR_HEIGHT,
    },
  });
};

export default styles;
