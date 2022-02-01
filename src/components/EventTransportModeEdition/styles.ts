import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING, BORDER_WIDTH } from '../../styles/metrics';

export default StyleSheet.create({
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
    marginTop: MARGIN.LG,
  },
  transportCell: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: PADDING.MD,
    paddingHorizontal: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.MD,
    borderColor: COPPER_GREY[300],
  },
  transportText: {
    ...FIRA_SANS_REGULAR.MD,
    flex: 1,
    color: COPPER_GREY[800],
    textAlign: 'left',
    marginVertical: MARGIN.SM,
  },
});
