import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
    margin: MARGIN.LG,
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
