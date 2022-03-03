import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  sectionText: {
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
    marginTop: MARGIN.LG,
  },
  optionCell: {
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
  selectedCell: {
    borderColor: COPPER[500],
  },
  optionText: {
    ...FIRA_SANS_REGULAR.MD,
    flex: 1,
    color: COPPER_GREY[900],
    marginVertical: MARGIN.SM,
  },
  select: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: PADDING.LG,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: PADDING.MD,
    marginVertical: PADDING.MD,
  },
  item: {
    backgroundColor: WHITE,
    paddingLeft: PADDING.LG,
    paddingVertical: PADDING.LG,
  },
  itemText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[700],
  },
  selectedItem: {
    flexDirection: 'row',
    backgroundColor: COPPER_GREY[100],
    padding: PADDING.LG,
    alignItems: 'center',
  },
  selectedItemText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[700],
    flex: 1,
  },
});
