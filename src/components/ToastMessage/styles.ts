import { StyleSheet } from 'react-native';
import { WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { BORDER_RADIUS, MARGIN, PADDING, SCREEN_HEIGHT } from '../../styles/metrics';

type ToastMessageStyleProps = {
  backgroundColor: string,
};

const TOAST_MESSAGE_HEIGHT = 46;

const styles = ({ backgroundColor } : ToastMessageStyleProps) => StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.SM,
    marginHorizontal: MARGIN.MD,
    backgroundColor,
    justifyContent: 'center',
    bottom: SCREEN_HEIGHT - TOAST_MESSAGE_HEIGHT,
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
