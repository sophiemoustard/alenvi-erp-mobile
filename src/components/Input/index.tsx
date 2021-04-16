import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import NiFeatherButton from '../FeatherButton';
import { PASSWORD, EMAIL } from '../../data/constants';
import Shadow from '../design/Shadow';

interface InputProps {
  value: string,
  title: string,
  style: Object,
  type: string,
  setValue: (value: string) => void,
}

const Input = ({ title, style, type, setValue, value }: InputProps) => {
  const isPassword = type === PASSWORD;
  const keyboardType = type === EMAIL ? 'email-address' : 'default';

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(isPassword);

  const iconName = secureTextEntry ? 'eye-off' : 'eye';
  const inputStyle = styles({ isSelected });

  const onPasswordIconPress = () => setSecureTextEntry(prevState => !prevState);

  return (
    <View style={style}>
      <View style={inputStyle.captionContainer}>
        <Text style={inputStyle.caption}>{title}</Text>
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
