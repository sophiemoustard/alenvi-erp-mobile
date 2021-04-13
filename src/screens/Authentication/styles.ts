import { StyleSheet } from 'react-native';
import { FIRA_SANS_BLACK } from '../../styles/fonts';
import { WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';

export default StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  title: {
    ...FIRA_SANS_BLACK.LG,
    textAlign: 'center',
    color: WHITE,
    marginBottom: MARGIN.XL,
  },
  input: {
    marginBottom: MARGIN.LG,
  },
});
