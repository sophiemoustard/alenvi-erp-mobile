import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, BUTTON_HEIGHT } from '../../styles/metrics';
import { PRIMARY, WHITE } from '../../styles/colors';

export default StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
