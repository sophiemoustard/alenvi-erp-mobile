import { StyleSheet } from 'react-native';
import { GREY } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';

const styles = StyleSheet.create({
  separator: {
    margin: MARGIN.SM,
  },
  checkBox: {
    marginHorizontal: MARGIN.SM,
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    textDecorationLine: 'none',
  },
  icon: {
    borderColor: GREY[100],
  },
});

export default styles;
