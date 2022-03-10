import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { ORANGE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: ORANGE[100],
  },
  message: {
    ...FIRA_SANS_REGULAR.MD,
    color: ORANGE[600],
    marginVertical: MARGIN.SM,
    marginHorizontal: MARGIN.MD,
  },
});
