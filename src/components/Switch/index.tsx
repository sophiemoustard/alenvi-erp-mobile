import React, { useRef, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Animated, LayoutChangeEvent } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
import { MARGIN } from '../../styles/metrics';
import styles from './styles';

type OptionType = { label: string, value: boolean };

type SwitchProps = {
  value: boolean,
  options: [OptionType, OptionType],
  backgroundColor: string,
  unselectedTextColor: string,
  onChange: () => void,
};

const Switch = ({ value, options, backgroundColor, unselectedTextColor, onChange }: SwitchProps) => {
  const switchStyles = styles({ backgroundColor, unselectedTextColor });
  const animationTextLeftValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const animationTextRightValue = useRef(new Animated.Value(value ? 0 : 1)).current;
  const animationToggleValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const onLayout = ({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => { setContainerWidth(width); };

  useEffect(() => {
    Animated.timing(
      animationTextLeftValue,
      { toValue: value ? 1 : 0, duration: 300, useNativeDriver: false }
    ).start();

    Animated.timing(
      animationTextRightValue,
      { toValue: value ? 0 : 1, duration: 300, useNativeDriver: false }
    ).start();

    Animated.timing(
      animationToggleValue,
      { toValue: value ? 0 : 1, duration: 300, useNativeDriver: true }
    ).start();
  }, [animationTextLeftValue, animationTextRightValue, animationToggleValue, value]);

  const dynamicStyles = {
    toggle: (animation: Animated.Value) => ({
      transform: [{ translateX: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, containerWidth - MARGIN.XS * 2],
      }) }],
    }),
    text: (animation: Animated.Value) => ({
      color: animation.interpolate({ inputRange: [0, 1], outputRange: [WHITE, COPPER_GREY[900]] }),
    }),
  };

  return <TouchableWithoutFeedback onPress={onChange}>
    <View style={switchStyles.container}>
      <Animated.View style={[dynamicStyles.toggle(animationToggleValue), switchStyles.toggle]} onLayout={onLayout} />
      <View style={switchStyles.textContainer}>
        <Animated.Text style={[dynamicStyles.text(animationTextLeftValue), switchStyles.text]}>
          {options[0]?.label}
        </Animated.Text>
        <Animated.Text style={[dynamicStyles.text(animationTextRightValue), switchStyles.text]}>
          {options[1]?.label}
        </Animated.Text>
      </View>
    </View>
  </TouchableWithoutFeedback>;
};

export default Switch;
