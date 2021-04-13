import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BUTTON_HEIGHT } from '../../styles/metrics';
import { PRIMARY, WHITE } from '../../styles/colors';
import { FIRA_SANS_BLACK } from '../../styles/fonts';

export default StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    height: BUTTON_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    ...FIRA_SANS_BLACK.MD,
    color: WHITE,
  },
});
