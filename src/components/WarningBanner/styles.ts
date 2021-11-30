import { StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';
import { BORDER_RADIUS, MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ORANGE[100],
    padding: 12,
    borderRadius: BORDER_RADIUS.SM,
    flexDirection: 'row',
    marginBottom: MARGIN.LG,
  },
  text: {
    color: ORANGE[900],
    marginLeft: 12,
  },
});

export default styles;
