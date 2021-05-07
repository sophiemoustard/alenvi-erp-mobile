import { StyleSheet } from 'react-native';
import { WHITE } from './colors';
import { FIRA_SANS_BLACK } from './fonts';
import { MARGIN, BORDER_RADIUS, BUTTON_HEIGHT } from './metrics';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  disabled: { opacity: 0.6 },
  button: {
    borderRadius: BORDER_RADIUS.MD,
    height: BUTTON_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    ...FIRA_SANS_BLACK.MD,
  },
  title: {
    ...FIRA_SANS_BLACK.XXL,
    marginVertical: MARGIN.XL,
  },
});
