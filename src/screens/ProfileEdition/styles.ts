import { StyleSheet } from 'react-native';
import { COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MARGIN, PADDING } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    padding: PADDING.XL,
    backgroundColor: COPPER_GREY[50],
  },
  header: {
    flexDirection: 'row',
    marginBottom: MARGIN.MD,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    color: COPPER_GREY[800],
    marginHorizontal: MARGIN.MD,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COPPER_GREY[50],
  },
  container: {
    marginVertical: MARGIN.XL,
  },
});
