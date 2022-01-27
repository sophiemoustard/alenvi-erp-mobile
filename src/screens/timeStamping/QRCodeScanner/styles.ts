import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COPPER_GREY[900],
    padding: PADDING.XL,
  },
  cell: {
    alignSelf: 'center',
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
});
