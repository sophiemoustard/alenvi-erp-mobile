import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  auxiliaryCell: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    height: 72,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: PADDING.LG,
    paddingRight: PADDING.XXL,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[200],
  },
  auxiliaryCellNotEditable: {
    flexDirection: 'row',
    height: 72,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: PADDING.XXL,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.XXL,
    borderColor: COPPER_GREY[200],
  },
  auxiliaryInfos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  auxiliaryText: {
    color: COPPER_GREY[800],
    textAlign: 'left',
    marginLeft: MARGIN.MD,
    fontSize: 16,
  },
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
});
