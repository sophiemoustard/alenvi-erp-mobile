import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

export default StyleSheet.create({
  view: {
    marginHorizontal: MARGIN.LG,
  },
  button: {
    marginVertical: MARGIN.LG,
    backgroundColor: GREY[100],
    borderColor: GREY[600],
    borderWidth: BORDER_WIDTH,
  },
});
