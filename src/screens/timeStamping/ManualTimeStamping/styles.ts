import { StyleSheet } from 'react-native';
import { BLACK } from '../../../styles/colors';
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
  submitButton: {
    marginBottom: MARGIN.XL,
  },
  reasons: {
    marginBottom: MARGIN.SM,
  },
  QRCodeTimeStampingButton: {
    ...FIRA_SANS_REGULAR.MD,
    color: BLACK,
    alignSelf: 'center',
    marginVertical: MARGIN.LG,
  },
});
