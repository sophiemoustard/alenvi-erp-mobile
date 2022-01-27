import React, { useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { COPPER_GREY, WHITE } from '../../styles/colors';
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

  useEffect(() => {
    Animated.timing(
      animationTextLeftValue,
      { toValue: value ? 1 : 0, duration: 300, useNativeDriver: false }
    ).start();

    Animated.timing(
      animationTextRightValue,
      { toValue: value ? 0 : 1, duration: 300, useNativeDriver: false }
    ).start();
  }, [animationTextLeftValue, animationTextRightValue, value]);

  const dynamicStyles = {
    text: (animation: Animated.Value) => ({
      color: animation.interpolate({ inputRange: [0, 1], outputRange: [WHITE, COPPER_GREY[900]] }),
    }),
  };

  return <TouchableWithoutFeedback onPress={onChange}>
    <View style={switchStyles.container}>
      <Animated.Text style={[dynamicStyles.text(animationTextLeftValue), switchStyles.text]}>
        {options[0]?.label}
      </Animated.Text>
      <Animated.Text style={[dynamicStyles.text(animationTextRightValue), switchStyles.text]}>
        {options[1]?.label}
      </Animated.Text>
    </View>
  </TouchableWithoutFeedback>;
};

export default Switch;
