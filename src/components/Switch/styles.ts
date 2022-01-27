import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING, MARGIN, BUTTON_HEIGHT } from '../../styles/metrics';
import { WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

type SwitchStyleProps = {
  backgroundColor: string,
};

const switchStyle = ({ backgroundColor } : SwitchStyleProps) => StyleSheet.create({
  container: {
    backgroundColor,
    borderRadius: BORDER_RADIUS.XXL,
    height: BUTTON_HEIGHT,
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.XL,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING.LG,
    justifyContent: 'space-around',
    height: '100%',
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
  },
  toggle: {
    backgroundColor: WHITE,
    width: '50%',
    height: BUTTON_HEIGHT - PADDING.SM * 2,
    position: 'absolute',
    marginHorizontal: MARGIN.XS,
    borderRadius: BORDER_RADIUS.XL,
  },
});

export default switchStyle;
