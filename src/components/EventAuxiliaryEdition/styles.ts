import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING, AVATAR_SIZE } from '../../styles/metrics';

export default StyleSheet.create({
  auxiliaryCellNotEditable: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: PADDING.XXL,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
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
    ...FIRA_SANS_MEDIUM.MD,
  },
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
});
