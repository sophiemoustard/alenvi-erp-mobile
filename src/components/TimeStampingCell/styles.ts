import { StyleSheet } from 'react-native';
import { GREEN, COPPER_GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR, NUNITO_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING, BUTTON_INTERVENTION_WIDTH, ICON } from '../../styles/metrics';

export default StyleSheet.create({
  sectionDelimiter: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
  },
  cell: {
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
    backgroundColor: WHITE,
    marginHorizontal: MARGIN.MD,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: PADDING.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    color: COPPER_GREY[900],
    marginVertical: MARGIN.SM,
    marginHorizontal: MARGIN.MD,
  },
  timeTitle: {
    ...FIRA_SANS_REGULAR.SM,
    color: COPPER_GREY[700],
    marginBottom: MARGIN.SM,
  },
  scheduledTime: {
    ...NUNITO_REGULAR.XXL,
    color: COPPER_GREY[900],
  },
  button: {
    width: BUTTON_INTERVENTION_WIDTH,
  },
  timeStamping: {
    ...FIRA_SANS_REGULAR.MD,
    color: GREEN[600],
    marginLeft: MARGIN.SM,
  },
  timeStampingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: ICON.XL,
    height: ICON.XL,
    backgroundColor: GREEN[600],
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 4 * BORDER_WIDTH,
    borderColor: GREEN[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
