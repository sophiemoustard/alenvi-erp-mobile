import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY } from '../../styles/colors';
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
  text: object,
  textContainer: Object,
};

const eventCellStyle = ({ borderColor, backgroundColor }: eventCellType) => StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'row',
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
    marginRight: MARGIN.XS,
  },
  timeContainer: {
    marginTop: MARGIN.XS,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: COPPER_GREY[200],
    borderRadius: BORDER_RADIUS.LG,
    paddingHorizontal: PADDING.MD,
    paddingVertical: PADDING.SM,
    height: '40%',
  },
  text: {
    ...FIRA_SANS_REGULAR.SM,
    color: COPPER[800],
  },
});

export default eventCellStyle;
