import { StyleSheet } from 'react-native';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';

export default StyleSheet.create({
  text: {
    ...FIRA_SANS_REGULAR.MD,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: MARGIN.XL,
  },
});
