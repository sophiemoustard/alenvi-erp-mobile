import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { WHITE } from '../styles/colors';

const styles = () => {
  const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

  return StyleSheet.create({
    statusBar: {
      display: 'flex',
      backgroundColor: WHITE,
      height: STATUS_BAR_HEIGHT,
    },
  });
};

export default styles;
