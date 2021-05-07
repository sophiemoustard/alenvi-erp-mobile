import { StyleSheet } from 'react-native';
import { GREY, PINK } from '../../styles/colors';
import { FIRA_SANS_MEDIUM, NUNITO_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    backgroundColor: GREY[100],
  },
  title: {
    marginTop: MARGIN.XXL,
    marginHorizontal: MARGIN.XL,
    marginVertical: MARGIN.MD,
  },
  viewDate: {
    marginHorizontal: MARGIN.XL,
    color: GREY[100],
  },
  container: {
    flexDirection: 'row',
    marginTop: MARGIN.XL,
  },
  date: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
  time: {
    ...NUNITO_REGULAR.XL,
    color: PINK[500],
    marginBottom: MARGIN.XL,
  },
  textIntervention: {
    color: PINK[600],
  },
  viewIntervention: {
    backgroundColor: PINK[100],
    marginBottom: MARGIN.XXL,
    marginLeft: MARGIN.XXL,
    borderRadius: BORDER_RADIUS.XXL,
    paddingHorizontal: PADDING.MD,
  },
  separator: {
    marginBottom: MARGIN.MD,
  },
});
