import { StyleSheet } from 'react-native';
import { MARGIN, BORDER_WIDTH } from '../../styles/metrics';
import { GREY } from '../../styles/colors';

export default StyleSheet.create({
  button: {
    marginTop: MARGIN.LG,
    marginBottom: MARGIN.SM,
    marginLeft: MARGIN.XS,
    backgroundColor: GREY[100],
    borderColor: GREY[600],
    borderWidth: BORDER_WIDTH,
  },
  textButton: {
    color: GREY[600],
  },
});
