import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { AVATAR_SIZE, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  auxiliaryItem: {
    paddingHorizontal: PADDING.LG,
    paddingVertical: PADDING.MD,
    flexDirection: 'row',
    alignItems: 'center',
  },
  auxiliaryItemText: {
    ...FIRA_SANS_REGULAR.MD,
  },
  image: {
    ...AVATAR_SIZE.SM,
    borderColor: COPPER_GREY[200],
    borderWidth: BORDER_WIDTH,
    marginRight: MARGIN.MD,
  },
});
