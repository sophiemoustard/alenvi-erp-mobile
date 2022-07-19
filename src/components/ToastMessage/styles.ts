import { StyleSheet } from 'react-native';
import { WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_RADIUS, HEADER_HEIGHT, MARGIN, PADDING, SCREEN_HEIGHT } from '../../styles/metrics';

type ToastMessageStyleProps = {
  backgroundColor: string,
};

const TOAST_MESSAGE_HEIGHT = 56;
const TOAST_MESSAGE_WIDTH = '92%';
const TOAST_POSITION = SCREEN_HEIGHT - HEADER_HEIGHT - TOAST_MESSAGE_HEIGHT;

const styles = ({ backgroundColor } : ToastMessageStyleProps) => StyleSheet.create({
  container: {
    width: TOAST_MESSAGE_WIDTH,
    height: TOAST_MESSAGE_HEIGHT,
    borderRadius: BORDER_RADIUS.SM,
    marginHorizontal: MARGIN.MD,
    backgroundColor,
    justifyContent: 'center',
    position: 'absolute',
    top: TOAST_POSITION - MARGIN.XL,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: BORDER_RADIUS.MD,
    height: TOAST_MESSAGE_HEIGHT,
    marginHorizontal: MARGIN.LG,
  },
  text: {
    ...FIRA_SANS_MEDIUM.SM,
    color: WHITE,
    paddingLeft: PADDING.LG,
  },
});

export default styles;
