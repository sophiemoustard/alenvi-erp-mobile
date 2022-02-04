import { StyleSheet } from 'react-native';
import { COPPER } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: COPPER[600],
    padding: PADDING.MD,
  },
  text: {
    color: COPPER[600],
    marginHorizontal: MARGIN.SM,
  },
  container: {
    marginTop: MARGIN.MD,
  },
  inputContainer: {
    marginHorizontal: MARGIN.XS,
  },
});
