import { StyleSheet } from 'react-native';
import { WHITE } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN } from '../../../styles/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  closeButton: {
    marginTop: MARGIN.MD,
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
  manualTimeStampingButton: {
    ...FIRA_SANS_REGULAR.MD,
    color: WHITE,
    alignSelf: 'center',
    marginBottom: MARGIN.LG,
  },
});
