import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING, MARGIN, BUTTON_HEIGHT } from '../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

type SwitchStyleProps = {
  backgroundColor: string,
  unselectedTextColor: string,
};

const switchStyle = ({ backgroundColor, unselectedTextColor } : SwitchStyleProps) => StyleSheet.create({
  container: {
    backgroundColor,
    borderRadius: BORDER_RADIUS.XXL,
    paddingHorizontal: PADDING.LG,
    height: BUTTON_HEIGHT,
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.XL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
  },
});

export default switchStyle;
