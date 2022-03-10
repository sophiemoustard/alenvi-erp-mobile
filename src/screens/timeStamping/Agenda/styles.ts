import { StyleSheet } from 'react-native';
import { COPPER_GREY, COPPER } from '../../../styles/colors';
import { FIRA_SANS_MEDIUM, NUNITO_REGULAR, FIRA_SANS_BLACK } from '../../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    backgroundColor: COPPER_GREY[50],
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
    color: COPPER_GREY[800],
  },
  time: {
    ...NUNITO_REGULAR.XXL,
    color: COPPER[500],
  },
  textIntervention: {
    color: COPPER[600],
  },
  viewIntervention: {
    backgroundColor: COPPER_GREY[200],
    borderRadius: BORDER_RADIUS.XXL,
    paddingHorizontal: PADDING.MD,
  },
  separator: {
    marginBottom: MARGIN.MD,
  },
});
