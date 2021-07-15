import { StyleSheet } from 'react-native';
import { WHITE } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { SCREEN_HEIGHT } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  blackScreen: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 24,
    ...FIRA_SANS_BOLD.XL,
    color: WHITE,
  },
  manualTimeStampingButton: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    alignSelf: 'center',
    position: 'absolute',
    top: SCREEN_HEIGHT - 64,
  },
});
