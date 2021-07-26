import { StyleSheet } from 'react-native';
import { BLACK } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { MARGIN, PADDING } from '../../styles/metrics';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    color: BLACK,
    margin: MARGIN.SM,
  },
  icon: {
    marginRight: MARGIN.SM,
  },
});

export default styles;
