import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BUTTON_HEIGHT, RADIUS_GAP } from '../../../styles/metrics';
import { WHITE } from '../../../styles/colors';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';

export default StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.MD,
    height: BUTTON_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    left: -RADIUS_GAP,
  },
  textButton: {
    ...FIRA_SANS_BLACK.MD,
    color: WHITE,
  },
});
