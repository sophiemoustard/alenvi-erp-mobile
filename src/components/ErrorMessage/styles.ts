import { StyleSheet } from 'react-native';
import { MARGIN } from '../../styles/metrics';
import { RED } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

export default StyleSheet.create({
  message: {
    ...FIRA_SANS_REGULAR.SM,
    color: RED,
    marginBottom: MARGIN.MD,
  },
});
