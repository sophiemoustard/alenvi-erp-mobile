import { StyleSheet } from 'react-native';
import { COPPER, COPPER_GREY } from '../../styles/colors';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MARGIN, TAB_BAR_HEIGHT, TAB_BAR_LABEL_WIDTH } from '../../styles/metrics';

export default (focused: Boolean = false) => StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
  },
  iconContainer: {
    alignItems: 'center',
    width: TAB_BAR_LABEL_WIDTH,
    marginTop: MARGIN.MD,
  },
  labelStyle: {
    ...FIRA_SANS_BOLD.MD,
    marginTop: MARGIN.SM,
    color: focused ? COPPER[600] : COPPER_GREY[800],
  },
});
