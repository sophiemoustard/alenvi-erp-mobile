import { StyleSheet } from 'react-native';
import { GREEN, COPPER_GREY, WHITE, COPPER } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING, BUTTON_INTERVENTION_WIDTH, ICON } from '../../styles/metrics';

export default StyleSheet.create({
  sectionDelimiter: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
  },
  cell: {
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH * 12,
    borderColor: COPPER[200],
    backgroundColor: WHITE,
    marginHorizontal: MARGIN.MD,
    paddingHorizontal: PADDING.XL,
    paddingVertical: PADDING.LG,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    color: COPPER_GREY[800],
  },
  scheduledTime: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[800],
  },
  button: {
    width: BUTTON_INTERVENTION_WIDTH,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
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
