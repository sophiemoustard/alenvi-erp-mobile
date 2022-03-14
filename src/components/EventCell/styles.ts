import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../styles/metrics';

const LEFT_BORDER_CELL = BORDER_WIDTH * 8;

type eventCellType = {
  borderColor: string,
  backgroundColor: string,
};

export type eventCellStyleType = {
  cell: object,
  infoContainer: object,
  eventTitle: object,
  eventInfo: object,
  timeContainer: object,
};

const eventCellStyle = ({ borderColor, backgroundColor }: eventCellType) => StyleSheet.create({
  cell: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: BORDER_WIDTH,
    borderLeftWidth: LEFT_BORDER_CELL,
    borderColor,
    backgroundColor,
    marginHorizontal: MARGIN.MD,
    paddingHorizontal: PADDING.LG,
    paddingVertical: PADDING.LG,
  },
  infoContainer: {
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
    marginRight: MARGIN.XS,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default eventCellStyle;
