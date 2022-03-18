import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, PADDING, IS_LARGE_SCREEN } from '../../../styles/metrics';

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
    position: 'relative',
  },
  limits: {
    width: IS_LARGE_SCREEN ? '70%' : '50%',
    aspectRatio: 1,
  },
  error: {
    position: 'absolute',
    bottom: 0,
  },
  manualTimeStampingButton: {
    ...FIRA_SANS_REGULAR.SM,
    color: WHITE,
    alignSelf: 'center',
    marginVertical: MARGIN.LG,
  },
});
