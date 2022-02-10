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
  selectedCell: {
    borderColor: COPPER[500],
  },
  transportText: {
    ...FIRA_SANS_REGULAR.MD,
    flex: 1,
    color: COPPER_GREY[900],
    marginVertical: MARGIN.SM,
  },
  picker: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: PADDING.LG,
  },
  pickerCloseButton: {
    alignSelf: 'flex-end',
    marginRight: PADDING.MD,
    marginVertical: PADDING.MD,
  },
  pickerItem: {
    backgroundColor: WHITE,
    paddingLeft: PADDING.LG,
    paddingVertical: PADDING.LG,
  },
  pickerItemText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[700],
  },
  selectedPickerItem: {
    flexDirection: 'row',
    backgroundColor: COPPER_GREY[100],
    padding: PADDING.LG,
    alignItems: 'center',
  },
  selectedPickerItemText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: COPPER_GREY[700],
    flex: 1,
  },
});
