import { StyleSheet } from 'react-native';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';

export default StyleSheet.create({
  labelStyle: {
    ...FIRA_SANS_BOLD.SM,
    alignItems: 'center',
    marginBottom: MARGIN.SM,
  },
});
