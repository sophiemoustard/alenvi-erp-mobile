import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    paddingVertical: PADDING.XL,
    paddingHorizontal: PADDING.LG,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COPPER_GREY[50],
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
  },
  container: {
    flex: 1,
    marginVertical: MARGIN.XL,
  },
  question: {
    ...FIRA_SANS_MEDIUM.MD,
    marginBottom: MARGIN.MD,
    color: COPPER_GREY[900],
  },
  reasons: {
    marginBottom: MARGIN.SM,
  },
  QRCodeTimeStampingButton: {
    ...FIRA_SANS_REGULAR.SM,
    color: COPPER_GREY[600],
    alignSelf: 'center',
    marginVertical: MARGIN.XL,
  },
});
