import { StyleSheet } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN } from '../../styles/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  dateCell: {
    backgroundColor: WHITE,
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH / 2,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderTopLeftRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[200],
  },
  timeCell: {
    backgroundColor: WHITE,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH / 2,
    borderBottomRightRadius: BORDER_RADIUS.SM,
    borderTopRightRadius: BORDER_RADIUS.SM,
    borderColor: COPPER_GREY[200],
    flex: 1,
  },
  text: {
    color: COPPER_GREY[800],
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: COPPER_GREY[100],
    marginHorizontal: MARGIN.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
