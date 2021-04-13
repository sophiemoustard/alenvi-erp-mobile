import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import NiFeatherButton from '../FeatherButton';

interface InputProps {
  title: string,
  style: Object,
}

const Input = ({ title, style }: InputProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const inputStyle = styles({ isSelected });

  return (
    <View style={style}>
      <View style={inputStyle.captionContainer}>
        <Text style={inputStyle.caption}>{title}</Text>
      </View>
      <View style={inputStyle.container}>
        <View style={inputStyle.inputContainer}>
          <TextInput style={inputStyle.input} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} />
          <NiFeatherButton name='eye' style={inputStyle.icon} />
        </View>
      </View>
    </View>
  );
};

export default Input;
