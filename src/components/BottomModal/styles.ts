import { StyleSheet } from 'react-native';
import { COPPER_GREY, MODAL_BACKDROP_GREY, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  modalContainer: {
    paddingTop: PADDING.XXXL,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  separator: {
    borderTopWidth: BORDER_WIDTH,
    borderColor: COPPER_GREY[200],
  },
  modalContent: {
    display: 'flex',
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    width: '100%',
    height: '100%',
    paddingTop: PADDING.LG,
    backgroundColor: WHITE,
  },
  goBack: {
    alignSelf: 'flex-end',
    paddingHorizontal: PADDING.LG,
  },
});
