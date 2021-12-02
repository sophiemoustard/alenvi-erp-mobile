import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  modalContainer: {
    paddingTop: PADDING.XXXL,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalContent: {
    display: 'flex',
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    width: '100%',
    height: '100%',
    paddingTop: PADDING.LG,
  },
  goBack: {
    alignSelf: 'flex-end',
    paddingHorizontal: PADDING.LG,
  },
});
