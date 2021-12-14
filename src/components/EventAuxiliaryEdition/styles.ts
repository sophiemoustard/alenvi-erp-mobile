import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING, AVATAR_SIZE, BORDER_WIDTH } from '../../styles/metrics';

export default StyleSheet.create({
  auxiliaryCellEditable: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.LG,
    paddingVertical: PADDING.MD,
    marginBottom: MARGIN.SM,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[300],
  },
  auxiliaryCellNotEditable: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.SM,
  },
  image: {
    ...AVATAR_SIZE.MD,
    borderColor: COPPER_GREY[200],
    borderWidth: BORDER_WIDTH,
  },
  auxiliaryInfos: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  auxiliaryText: {
    color: COPPER_GREY[800],
    textAlign: 'left',
    marginLeft: MARGIN.MD,
    ...FIRA_SANS_MEDIUM.MD,
    flex: 1,
  },
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
});
