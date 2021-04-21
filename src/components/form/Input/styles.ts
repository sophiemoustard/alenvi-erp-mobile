import { StyleSheet } from 'react-native';
import { WHITE, GREY, PINK, ORANGE } from '../../../styles/colors';
import { INPUT_HEIGHT, BORDER_RADIUS, PADDING, MARGIN, BORDER_WIDTH, RADIUS_GAP } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM, FIRA_SANS_ITALIC } from '../../../styles/fonts';

interface inputStyleProps{
  isSelected: Boolean,
}

const inputStyle = ({ isSelected } : inputStyleProps) => StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: MARGIN.XS,
    width: '100%',
    left: -RADIUS_GAP,
  },
  inputContainer: {
    width: '100%',
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? PINK[500] : GREY[600],
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: WHITE,
  },
  input: {
    ...FIRA_SANS_MEDIUM.MD,
    height: INPUT_HEIGHT,
    paddingHorizontal: PADDING.MD,
    flex: 1,
  },
  icon: {
    paddingHorizontal: PADDING.MD,
  },
  captionContainer: {
    width: '100%',
  },
  caption: {
    ...FIRA_SANS_REGULAR.SM,
    textAlign: 'left',
    marginBottom: MARGIN.XS,
  },
  invalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginTop: MARGIN.XXS,
  },
});

export default inputStyle;
