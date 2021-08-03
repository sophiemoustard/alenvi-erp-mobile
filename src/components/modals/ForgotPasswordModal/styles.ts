import { StyleSheet } from 'react-native';
import { COPPER_GREY, MODAL_BACKDROP_GREY, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    height: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: MODAL_BACKDROP_GREY,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '85%',
    backgroundColor: WHITE,
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    padding: PADDING.LG,
  },
  button: {
    marginBottom: MARGIN.SM,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
    textAlign: 'center',
    marginVertical: MARGIN.LG,
  },
  beforeCodeSentText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[800],
    textAlign: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.XXL,
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: MARGIN.SM,
    marginBottom: MARGIN.XL,
  },
  input: {
    ...FIRA_SANS_REGULAR.XXL,
    marginHorizontal: MARGIN.XXS,
  },
  afterCodeSent: {
    textAlign: 'center',
  },
  afterCodeSentText: {
    ...FIRA_SANS_REGULAR.MD,
    color: COPPER_GREY[800],
  },
  recipient: {
    ...FIRA_SANS_BOLD.MD,
    color: COPPER_GREY[800],
  },
});

export default styles;
