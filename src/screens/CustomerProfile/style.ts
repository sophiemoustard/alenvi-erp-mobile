import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BLACK } from '../../styles/fonts';
import { MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: PADDING.XXL,
    paddingHorizontal: PADDING.XL,
  },
  header: {
    marginBottom: MARGIN.XL,
  },
  identity: {
    ...FIRA_SANS_BLACK.XL,
    color: COPPER_GREY[800],
  },
});
