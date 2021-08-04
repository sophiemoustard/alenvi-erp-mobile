import { StyleSheet } from 'react-native';
import { TRANSPARENT_COPPER } from '../../../styles/colors';
import { BORDER_RADIUS } from '../../../styles/metrics';

export default StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: -3,
    bottom: -3,
    left: -3,
    right: -3,
    zIndex: -1,
    backgroundColor: TRANSPARENT_COPPER,
    borderRadius: BORDER_RADIUS.MD,
  },
});
