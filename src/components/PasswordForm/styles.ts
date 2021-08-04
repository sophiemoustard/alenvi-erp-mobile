import { StyleSheet } from 'react-native';
import { MARGIN, PADDING } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { COPPER_GREY } from '../../styles/colors';

const styles = StyleSheet.create({
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginVertical: MARGIN.LG,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COPPER_GREY[50],
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: PADDING.XL,
  },
  goBack: {
    margin: MARGIN.MD,
  },
  input: {
    marginBottom: MARGIN.SM,
  },
  footer: {
    marginBottom: MARGIN.XL,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default styles;
