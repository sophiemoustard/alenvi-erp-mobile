import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE, COPPER } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

const LEFT_BORDER_CELL = BORDER_WIDTH * 8;

export default StyleSheet.create({
  cell: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderLeftWidth: LEFT_BORDER_CELL,
    borderColor: COPPER[100],
    backgroundColor: WHITE,
    marginHorizontal: MARGIN.MD,
    paddingHorizontal: PADDING.LG,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: PADDING.LG,
    flex: 1,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    color: COPPER_GREY[800],
  },
  eventInfo: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[500],
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'flex-start',
  },
});
