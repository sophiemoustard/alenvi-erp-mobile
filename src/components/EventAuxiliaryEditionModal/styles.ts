import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_WIDTH, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  auxiliaryItem: {
    padding: PADDING.LG,
  },
  separator: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
  },
  auxiliaryItemText: {
    ...FIRA_SANS_REGULAR.MD,
  },
});
