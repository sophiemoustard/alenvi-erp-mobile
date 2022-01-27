import React, { useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
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
  const animationValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(
      animationValue,
      { toValue: value ? 1 : 0, duration: 300, useNativeDriver: false }
    ).start();
  }, [animationValue, value]);

  const dynamicStyles = {
    text: (animation: Animated.Value) => ({
      color: animation.interpolate({ inputRange: [0, 1], outputRange: ['black', 'white'] }),
    }),
  };

  return <TouchableWithoutFeedback onPress={onChange}>
    <View style={switchStyles.container}>
      <Animated.Text style={dynamicStyles.text(animationValue)}>{options[0]?.label}</Animated.Text>
      <Animated.Text style={dynamicStyles.text(animationValue)}>{options[1]?.label}</Animated.Text>
    </View>
  </TouchableWithoutFeedback>;
};

export default Switch;
