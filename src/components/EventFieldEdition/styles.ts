import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY } from '../../styles/colors';
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
  input: {
    borderColor: COPPER_GREY[300],
    paddingHorizontal: PADDING.SM,
  },
  container: {
    marginTop: MARGIN.MD,
  },
});
