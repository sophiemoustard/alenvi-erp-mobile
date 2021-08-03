import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { COPPER_GREY } from '../../styles/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  body: {
    flexGrow: 1,
    margin: MARGIN.LG,
  },
  title: {
    ...FIRA_SANS_BOLD.LG,
    marginBottom: MARGIN.LG,
    color: COPPER_GREY[800],
  },
  input: {
    marginBottom: MARGIN.XS,
  },
  content: {
    marginBottom: MARGIN.LG,
    flex: 1,
  },
  goBack: {
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
});
