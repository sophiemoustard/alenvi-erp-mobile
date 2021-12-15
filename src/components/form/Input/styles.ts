import { StyleSheet } from 'react-native';
import { WHITE, COPPER_GREY, COPPER, ORANGE } from '../../../styles/colors';
import { INPUT_HEIGHT, BORDER_RADIUS, PADDING, MARGIN, BORDER_WIDTH } from '../../../styles/metrics';
import { FIRA_SANS_REGULAR, FIRA_SANS_MEDIUM, FIRA_SANS_ITALIC } from '../../../styles/fonts';

interface inputStyleProps{
  isSelected: Boolean,
}

export interface InputStyleType {
  container: object,
  inputContainer: object,
  input: object,
  icon: object,
  captionContainer: object,
  caption: object,
  invalid: object,
}

const inputStyle = ({ isSelected } : inputStyleProps) => StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? COPPER[500] : COPPER_GREY[300],
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
    color: COPPER_GREY[900],
  },
  captionContainer: {
    width: '100%',
  },
  caption: {
    ...FIRA_SANS_REGULAR.SM,
    textAlign: 'left',
    marginBottom: MARGIN.XS,
    color: COPPER_GREY[700],
  },
  invalid: {
    ...FIRA_SANS_ITALIC.SM,
    color: ORANGE[600],
    marginTop: MARGIN.XXS,
  },
});

export default inputStyle;
