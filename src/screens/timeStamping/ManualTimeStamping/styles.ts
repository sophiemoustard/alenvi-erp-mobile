import { StyleSheet } from 'react-native';
import { GREY, WHITE } from '../../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../../styles/metrics';

export default StyleSheet.create({
  screen: {
    marginHorizontal: MARGIN.LG,
    marginVertical:MARGIN.XXL,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.LG,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: GREY[200],
    backgroundColor: WHITE,
  },
  view: {
    margin: MARGIN.MD,
  },
  sectionDelimiter: {
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    marginVertical: MARGIN.MD,
  },
  subtitle: {
    ...FIRA_SANS_REGULAR.SM,
    color: GREY[700],
    marginBottom: MARGIN.SM,
  },
  time: {
    ...FIRA_SANS_MEDIUM.MD,
  },
});
