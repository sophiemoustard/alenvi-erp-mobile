import { Dimensions, StyleSheet } from 'react-native';
import { isIOS } from '../core/data/constants';

const { width, height } = Dimensions.get('window');

export const PADDING = {
  XS: 2,
  SM: 4,
  MD: 8,
  LG: 16,
  XL: 24,
  XXL: 32,
  XXXL: 64,
};

export const MARGIN = {
  XXS: 2,
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 64,
  XXXL: 128,
};

export const BORDER_RADIUS = {
  XS: 4,
  SM: 12,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

export const ICON = {
  XXS: 12,
  XS: 16,
  SM: 20,
  MD: 24,
  LG: 26,
  XL: 32,
  XXL: 64,
  XXXL: 72,
};

export const LINE_HEIGHT = {
  SM: 16,
  MD: 24,
};

export const AVATAR_SIZE = StyleSheet.create({
  SM: {
    width: BORDER_RADIUS.XL,
    height: BORDER_RADIUS.XL,
    borderRadius: BORDER_RADIUS.XL,
  },
  MD: {
    width: BORDER_RADIUS.XXL,
    height: BORDER_RADIUS.XXL,
    borderRadius: BORDER_RADIUS.XXL,
  },
});

export const BUTTON_HEIGHT = 48;
export const INPUT_HEIGHT = 48;
export const BORDER_WIDTH = 1;
export const TAB_BAR_HEIGHT = 72;
export const HEADER_HEIGHT = 64;
export const BUTTON_INTERVENTION_WIDTH = 128;
export const TAB_BAR_LABEL_WIDTH = 110;
export const SWITCH_TEXT_WIDTH = 64;

export const SCREEN_HEIGHT = width < height ? height : width;
export const SMALL_SCREEN_MAX_HEIGHT = 568;
export const IS_LARGE_SCREEN = SCREEN_HEIGHT > SMALL_SCREEN_MAX_HEIGHT;
export const KEYBOARD_AVOIDING_VIEW_BEHAVIOR = isIOS ? 'padding' : 'height';
export const KEYBOARD_PADDING_TOP = 32;
export const hitSlop = { top: 12, bottom: 12, left: 12, right: 12 };
