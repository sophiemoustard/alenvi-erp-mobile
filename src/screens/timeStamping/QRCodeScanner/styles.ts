import { StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, SCREEN_HEIGHT } from '../../../styles/metrics';

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
  limitsContainer: {
    alignItems: 'center',
  },
  limits: {
    width: 250,
    height: 250,
  },
  manualTimeStampingButton: {
    ...FIRA_SANS_REGULAR.SM,
    color: WHITE,
    alignSelf: 'center',
    marginVertical: MARGIN.LG,
  },
  eventInfos: {
    backgroundColor: BLACK,
    height: SCREEN_HEIGHT,
  },
});
