import { StyleSheet } from 'react-native';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    backgroundColor: GREY[100],
  },
  title: {
    marginTop: MARGIN.XXL,
    marginBottom: MARGIN.MD,
  },
  view: {
    marginHorizontal: MARGIN.XL,
    color: GREY[100],
  },
  date: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREY[800],
    marginTop: MARGIN.XL,
  },
  time: {
    ...FIRA_SANS_REGULAR.XL,
    color: PINK[500],
    marginBottom: MARGIN.XL,
  },
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
