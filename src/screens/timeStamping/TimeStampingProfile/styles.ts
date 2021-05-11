import { StyleSheet } from 'react-native';
import { GREY, PINK } from '../../../styles/colors';
import { FIRA_SANS_MEDIUM, NUNITO_REGULAR, FIRA_SANS_BLACK } from '../../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    backgroundColor: GREY[100],
  },
  title: {
    ...FIRA_SANS_BLACK.XL,
    marginHorizontal: MARGIN.XL,
    marginBottom: MARGIN.XL,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: PADDING.LG,
    marginHorizontal: MARGIN.MD,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: MARGIN.XL,
  },
  date: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
  time: {
    ...NUNITO_REGULAR.XL,
    color: PINK[500],
  },
  textIntervention: {
    color: PINK[600],
  },
  viewIntervention: {
    backgroundColor: PINK[100],
    borderRadius: BORDER_RADIUS.XXL,
    paddingHorizontal: PADDING.MD,
  },
  separator: {
    marginBottom: MARGIN.MD,
  },
});
