import { StyleSheet } from 'react-native';
import { WHITE, PINK } from '../../../styles/colors';
import commonStyle from '../../../styles/common';

export default StyleSheet.create({
  button: {
    ...commonStyle.button,
    backgroundColor: PINK[500],
    color: WHITE,
  },
  textButton: {
    ...commonStyle.textButton,
    color: WHITE,
  },
});
