import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import NiFeatherButton from '../FeatherButton';
import { PASSWORD, EMAIL } from '../../data/constants';
import { WHITE } from '../../styles/colors';
import Shadow from '../design/Shadow';

interface InputProps {
  value: string,
  title: string,
  type: string,
  style?: Object,
  darkMode?: boolean,
  setValue: (value: string) => void,
}

const Input = ({ title, type, setValue, value, style = {}, darkMode = false }: InputProps) => {
  const isPassword = type === PASSWORD;
  const keyboardType = type === EMAIL ? 'email-address' : 'default';

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(isPassword);

  const iconName = secureTextEntry ? 'eye-off' : 'eye';
  const inputStyle = styles({ isSelected });
  const textStyle = darkMode ? { ...inputStyle.caption, color: WHITE } : inputStyle.caption;

  const onPasswordIconPress = () => setSecureTextEntry(prevState => !prevState);

  return (
    <View style={style}>
      <View style={inputStyle.captionContainer}>
        <Text style={textStyle}>{title}</Text>
      </View>
      <View style={inputStyle.container}>
        <View style={inputStyle.inputContainer}>
          <TextInput style={inputStyle.input} onChangeText={setValue} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} secureTextEntry={secureTextEntry} keyboardType={keyboardType}
            value={value} />
          {isPassword && <NiFeatherButton name={iconName} style={inputStyle.icon} onPress={onPasswordIconPress} />}
        </View>
        {isSelected && <Shadow />}
      </View>
    </View>
  );
};

export default Input;
