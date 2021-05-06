import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  cellEvent: {
    width: '90%',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    backgroundColor: WHITE,
    alignSelf: 'center',
    marginBottom: MARGIN.MD,
  },
  cellText: {
    marginVertical: MARGIN.SM,
    paddingHorizontal: PADDING.MD,
  },
  eventTimeText: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[700],
    paddingHorizontal: PADDING.MD,
    marginTop: MARGIN.MD,
    marginBottom: MARGIN.SM,
  },
  scheduledEvent: {
    ...FIRA_SANS_REGULAR.XL,
    color: GREY[900],
    marginHorizontal: MARGIN.MD,
    marginBottom: MARGIN.MD,
  },
});
