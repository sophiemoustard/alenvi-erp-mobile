import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, LINE_HEIGHT, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  cell: {
    marginVertical: MARGIN.XL,
    padding: PADDING.LG,
    flexDirection: 'row',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[200],
    backgroundColor: WHITE,
  },
  customerInfo: {
    flex: 1,
  },
  sectionDelimiter: {
    borderRightWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
    marginHorizontal: MARGIN.MD,
  },
  subtitle: {
    ...FIRA_SANS_REGULAR.SM,
    lineHeight: LINE_HEIGHT.SM,
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
  info: {
    ...FIRA_SANS_MEDIUM.MD,
    lineHeight: LINE_HEIGHT.MD,
    color: COPPER_GREY[900],
  },
});
