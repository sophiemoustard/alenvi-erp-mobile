import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING, MARGIN, BUTTON_HEIGHT } from '../../styles/metrics';

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
    justifyContent: 'center',
  },
});

export default switchStyle;
