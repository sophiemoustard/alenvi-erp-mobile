import { StyleSheet } from 'react-native';
import { WHITE, GREY, PINK } from '../../styles/colors';
import { INPUT_HEIGHT, BORDER_RADIUS, PADDING, MARGIN, BORDER_WIDTH } from '../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface inputStyleProps{
  isSelected: Boolean,
}

const inputStyle = ({ isSelected } : inputStyleProps) => StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: MARGIN.XS,
    width: '100%',
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
    color: WHITE,
    marginBottom: MARGIN.XS,
  },
});

export default inputStyle;
