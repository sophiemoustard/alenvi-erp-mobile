import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { MARGIN } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    marginVertical: MARGIN.LG,
    marginHorizontal: MARGIN.MD,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
  },
  container: {
    flex: 1,
    marginVertical: MARGIN.XL,
  },
  question: {
    ...FIRA_SANS_MEDIUM.MD,
    marginBottom: MARGIN.MD,
  },
  reasons: {
    marginBottom: MARGIN.SM,
  },
  QRCodeTimeStampingButton: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[600],
    alignSelf: 'center',
    marginVertical: MARGIN.XL,
  },
});
