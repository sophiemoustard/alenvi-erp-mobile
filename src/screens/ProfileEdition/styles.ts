import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    padding: PADDING.XL,
  },
  header: {
    flexDirection: 'row',
    marginBottom: MARGIN.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    marginHorizontal: MARGIN.MD,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    marginVertical: MARGIN.XL,
  },
});
