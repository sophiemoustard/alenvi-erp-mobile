import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';

type OptionType = { label: string, value: boolean };

type SwitchProps = {
  value: boolean,
  options: OptionType[],
  backgroundColor: string,
  unselectedTextColor: string,
  onChange: () => void,
};

const Switch = ({ value, options, backgroundColor, unselectedTextColor, onChange }: SwitchProps) => {
  const switchStyles = styles({ backgroundColor, unselectedTextColor });

  return <TouchableWithoutFeedback onPress={onChange}>
    <View style={switchStyles.container}>
      <Text>{options?.find(opt => opt.value === value)?.label}</Text>
    </View>
  </TouchableWithoutFeedback>;
};

export default Switch;
