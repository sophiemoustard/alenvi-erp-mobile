import { StyleSheet } from 'react-native';
import { FIRA_SANS_BLACK, FIRA_SANS_REGULAR } from '../../styles/fonts';
import { WHITE, GREY } from '../../styles/colors';
import { MARGIN, PADDING } from '../../styles/metrics';

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
  forgotPassword: {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    padding: PADDING.MD,
  },
  forgotPasswordText: {
    ...FIRA_SANS_REGULAR.SM,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: WHITE,
    textShadowColor: GREY[800],
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  button: {
    marginTop: MARGIN.XL,
    marginBottom: MARGIN.SM,
  },
});
