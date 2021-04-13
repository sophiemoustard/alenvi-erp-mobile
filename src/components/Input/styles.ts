import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '../../styles/colors';
import { INPUT_HEIGHT, BORDER_RADIUS, PADDING, MARGIN } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    ...FIRA_SANS_MEDIUM.MD,
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS.MD,
    borderColor: GREY[600],
    borderWidth: 1,
    paddingHorizontal: PADDING.MD,
    backgroundColor: WHITE,
  },
  caption: {
    ...FIRA_SANS_REGULAR.SM,
    textAlign: 'left',
    color: WHITE,
    marginBottom: MARGIN.XS,
  },
});
