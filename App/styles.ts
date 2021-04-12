import { Platform, StyleSheet } from 'react-native';
import { WHITE } from '../src/styles/colors';

const styles = (StatusBarHeight: number = 20) => {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: 'flex',
      backgroundColor: WHITE,
      height: STATUSBAR_HEIGHT,
    },
  });
};

export default styles;
