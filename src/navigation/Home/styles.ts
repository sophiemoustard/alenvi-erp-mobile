import { StyleSheet } from 'react-native';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { MARGIN, TAB_BAR_HEIGHT } from '../../styles/metrics';

export default StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
  },
  labelStyle: {
    ...FIRA_SANS_BOLD.MD,
    marginBottom: MARGIN.SM,
  },
});
