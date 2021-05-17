import { StyleSheet } from 'react-native';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  separator: {
    margin: MARGIN.SM,
  },
  container: {
    marginHorizontal: MARGIN.SM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
  },
  icon: {
    marginRight: MARGIN.SM,
  },
});

export default styles;
