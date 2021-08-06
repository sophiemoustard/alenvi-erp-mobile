import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../../styles/colors';
import commonStyle from '../../../styles/common';
import { BORDER_WIDTH, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  button: {
    ...commonStyle.button,
    borderColor: COPPER_GREY[600],
    backgroundColor: COPPER_GREY[100],
    borderWidth: BORDER_WIDTH,
    paddingHorizontal: PADDING.LG,
  },
  textButton: {
    ...commonStyle.textButton,
    color: COPPER_GREY[600],
    textAlign: 'center',
  },
});
