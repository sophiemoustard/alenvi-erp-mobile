import { StyleSheet } from 'react-native';
import { FIRA_SANS_BLACK } from '../../styles/fonts';
import { WHITE } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FIRA_SANS_BLACK.LG,
    textAlign: 'center',
    color: WHITE,
  },
});
