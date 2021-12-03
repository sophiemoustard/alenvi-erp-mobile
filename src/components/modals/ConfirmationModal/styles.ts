import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { MARGIN, BUTTON_HEIGHT } from '../../../styles/metrics';
import { FIRA_SANS_BOLD, FIRA_SANS_REGULAR } from '../../../styles/fonts';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: MARGIN.XL,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
    flex: 1,
  },
  closeButton: {
    marginLeft: MARGIN.SM,
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
    maxWidth: 176,
  },
});

export default styles;
