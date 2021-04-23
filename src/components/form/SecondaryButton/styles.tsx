import { StyleSheet } from 'react-native';
import { GREY } from '../../../styles/colors';
import commonStyle from '../../../styles/common';

export default StyleSheet.create({
  button: {
    ...commonStyle.button,
    borderColor: GREY[600],
  },
  textButton: {
    ...commonStyle.textButton,
    color: GREY[800],
  },
});
