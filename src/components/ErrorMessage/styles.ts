import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { ORANGE, RED } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { WARNING } from '../../core/data/constants';

export default (type: string) => StyleSheet.create({
  message: {
    ...FIRA_SANS_REGULAR.SM,
    color: type === WARNING ? ORANGE[500] : RED,
    marginBottom: MARGIN.MD,
  },
});
