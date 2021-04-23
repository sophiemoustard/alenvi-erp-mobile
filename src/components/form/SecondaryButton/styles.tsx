import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import commonStyle from '../../../styles/common';
import { BORDER_WIDTH } from '../../../styles/metrics';

export default StyleSheet.create({
  button: {
    ...commonStyle.button,
    borderColor: GREY[600],
    backgroundColor: GREY[100],
    borderWidth: BORDER_WIDTH,
  },
  textButton: {
    ...commonStyle.textButton,
    color: GREY[600],
  },
});
