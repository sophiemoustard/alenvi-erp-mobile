import { StyleSheet, ViewStyle } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

const LEFT_BORDER_CELL = BORDER_WIDTH * 8;

type eventCellType = {
  borderColor: string,
  backgroundColor: string,
};

const cellContainerStyle = ({ borderColor, backgroundColor } : eventCellType): ViewStyle => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: BORDER_RADIUS.MD,
  borderWidth: BORDER_WIDTH,
  borderLeftWidth: LEFT_BORDER_CELL,
  borderColor,
  backgroundColor,
  marginHorizontal: MARGIN.MD,
  paddingHorizontal: PADDING.LG,
});

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: PADDING.LG,
    flex: 1,
  },
  eventTitle: {
    ...FIRA_SANS_BOLD.MD,
    color: COPPER_GREY[800],
  },
  eventInfo: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[500],
    marginTop: MARGIN.XS,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'flex-start',
  },
});

export { styles, cellContainerStyle };
