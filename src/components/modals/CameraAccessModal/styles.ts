import { StyleSheet } from 'react-native';
import { PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

export default StyleSheet.create({
  container: {
    margin: MARGIN.LG,
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
