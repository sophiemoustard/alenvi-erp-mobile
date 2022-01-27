import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, HEADER_HEIGHT, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COPPER_GREY[800],
    alignItems: 'center',
    paddingHorizontal: PADDING.MD,
    height: HEADER_HEIGHT,
    justifyContent: 'space-evenly',
  },
  title: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    textAlign: 'left',
    flex: 1,
    marginHorizontal: MARGIN.SM,
  },
  buttonTitle: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    textAlign: 'center',
  },
  button: {
    width: '40%',
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COPPER[400],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING.XL,
  },
});
