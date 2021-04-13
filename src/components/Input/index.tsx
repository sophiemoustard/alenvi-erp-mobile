import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import NiFeatherButton from '../FeatherButton';
import { PASSWORD } from '../../data/constants';

interface InputProps {
  title: string,
  style: Object,
  type?: string,
}

const Input = ({ title, style, type }: InputProps) => {
  const isPassword = type === PASSWORD;

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(isPassword);

  const iconName = secureTextEntry ? 'eye-off' : 'eye';
  const inputStyle = styles({ isSelected });

  return (
    <View style={style}>
      <View style={inputStyle.captionContainer}>
        <Text style={inputStyle.caption}>{title}</Text>
      </View>
      <View style={inputStyle.container}>
        <View style={inputStyle.inputContainer}>
          <TextInput style={inputStyle.input} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} secureTextEntry={secureTextEntry} />
          {isPassword &&
            <NiFeatherButton name={iconName} style={inputStyle.icon}
              onPress={() => setSecureTextEntry(prevState => !prevState)} />
          }
        </View>
      </View>
    </View>
  );
};

export default Input;
