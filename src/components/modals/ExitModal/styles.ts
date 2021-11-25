import { StyleSheet } from 'react-native';
import { WHITE, MODAL_BACKDROP_GREY, COPPER, COPPER_GREY } from '../../../styles/colors';
import { BORDER_RADIUS, PADDING, MARGIN, BUTTON_HEIGHT } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: MODAL_BACKDROP_GREY,
  },
  modalContent: {
    display: 'flex',
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.XL,
    width: '90%',
    padding: PADDING.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.XL,
    color: COPPER_GREY[800],
  },
  contentText: {
    ...FIRA_SANS_REGULAR.MD,
    marginBottom: MARGIN.XL,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: COPPER[500],
  },
  button: {
    height: BUTTON_HEIGHT,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: MARGIN.XL,
    maxWidth: 180,
  },
});

export default styles;
