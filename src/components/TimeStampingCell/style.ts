import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR, NUNITO_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  cell: {
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    backgroundColor: WHITE,
    marginHorizontal: MARGIN.MD,
  },
  view: {
    marginHorizontal: MARGIN.MD,
  },
  title: {
    ...NUNITO_REGULAR.XL,
    marginVertical: MARGIN.SM,
    paddingHorizontal: PADDING.MD,
  },
  timeTitle: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[700],
    marginTop: MARGIN.MD,
    marginBottom: MARGIN.SM,
  },
  scheduledTime: {
    ...NUNITO_REGULAR.XL,
    color: GREY[900],
    marginBottom: MARGIN.MD,
  },
});
