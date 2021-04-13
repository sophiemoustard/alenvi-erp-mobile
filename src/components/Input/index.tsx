import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

interface InputProps {
  title: string,
  style: Object,
}

const Input = ({ title, style }: InputProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const inputStyle = styles({ isSelected });

  return (
    <View style={{ ...inputStyle.container, ...style }}>
      <Text style={inputStyle.caption}>{title}</Text>
      <TextInput style={inputStyle.input} onTouchStart={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)} />
    </View>
  );
};

export default Input;
