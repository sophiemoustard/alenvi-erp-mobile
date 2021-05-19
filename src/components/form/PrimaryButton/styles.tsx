import { StyleSheet } from 'react-native';
import { WHITE, PINK } from '../../../styles/colors';
import commonStyle from '../../../styles/common';
import { PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  button: {
    ...commonStyle.button,
    backgroundColor: PINK[500],
    color: WHITE,
    paddingHorizontal: PADDING.LG,
  },
  textButton: {
    ...commonStyle.textButton,
    color: WHITE,
  },
});
