import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    textAlign: 'center',
    margin: MARGIN.MD,
    fontSize: 20,
  },
  body: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
  },
});
