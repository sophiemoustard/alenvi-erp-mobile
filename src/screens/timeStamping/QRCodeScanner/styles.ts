import { StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../styles/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: BLACK,
  },
  closeButton: {
    marginTop: MARGIN.LG,
    marginLeft: MARGIN.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.XL,
    color: WHITE,
    marginTop: MARGIN.XL,
    marginLeft: MARGIN.LG,
  },
  cell: {
    alignSelf: 'center',
    marginHorizontal: MARGIN.LG,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  manualTimeStampingButton: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    alignSelf: 'center',
    marginBottom: MARGIN.LG,
    marginTop: MARGIN.SM,
  },
});
