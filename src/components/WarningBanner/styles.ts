import { StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN, PADDING } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ORANGE[100],
    padding: PADDING.LG,
    borderRadius: BORDER_RADIUS.SM,
    flexDirection: 'row',
    marginBottom: MARGIN.LG,
  },
  text: {
    color: ORANGE[900],
    marginLeft: MARGIN.MD,
  },
});

export default styles;
