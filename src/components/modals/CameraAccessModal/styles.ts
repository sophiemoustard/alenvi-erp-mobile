import { StyleSheet } from 'react-native';
import { PINK } from '../../../styles/colors';
import { MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    padding: PADDING.XL,
  },
  text: {
    ...FIRA_SANS_REGULAR.SM,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: MARGIN.XL,
  },
  buttonText: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[400],
  },
});
