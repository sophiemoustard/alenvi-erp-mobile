import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';
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
    marginHorizontal: MARGIN.XS,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XS,
    borderColor: COPPER_GREY[300],
  },
  pickerItem: {
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.XS,
    paddingLeft: PADDING.LG,
    paddingVertical: PADDING.LG,
  },
  pickerItemText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[700],
  },
  selectedPickerItem: {
    borderRadius: BORDER_RADIUS.XS,
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
