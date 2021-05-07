import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import styles, { InputStyleType } from './styles';
import NiFeatherButton from '../../FeatherButton';
import { PASSWORD, EMAIL } from '../../../core/data/constants';
import { WHITE } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import { FeatherType } from '../../../types/IconType';

interface InputProps {
  value: string,
  caption: string,
  type: string,
  onChangeText: (value: string) => void,
  style?: Object,
  darkMode?: boolean,
  validationMessage?: string,
  disabled?: boolean,
}

const Input = ({
  caption,
  type,
  onChangeText,
  value,
  style = {},
  darkMode = false,
  validationMessage = '',
  disabled = false,
}: InputProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(false);
  const [autoCapitalize, setAutoCapitalize] = useState<'none' | 'sentences' | 'words' | 'characters'>();
  const [keyboardType, setKeyboardType] = useState<KeyboardTypeOptions>();
  const [iconName, setIconName] = useState<FeatherType>('eye-off');
  const [inputStyle, setInputStyle] = useState<InputStyleType>(styles({ isSelected: false }));
  const [textStyle, setTextStyle] = useState<object>({});

  useEffect(() => {
    setAutoCapitalize(['password', 'email'].includes(type) ? 'none' : 'sentences');
    setKeyboardType(type === EMAIL ? 'email-address' : 'default');
    setSecureTextEntry(type === PASSWORD);
  }, [type]);

  useEffect(() => setIconName(secureTextEntry ? 'eye-off' : 'eye'), [secureTextEntry]);

  useEffect(() => setInputStyle(styles({ isSelected })), [isSelected]);

  useEffect(
    () => setTextStyle(darkMode ? { ...inputStyle.caption, color: WHITE } : inputStyle.caption),
    [darkMode, inputStyle]
  );

  const onPasswordIconPress = () => setSecureTextEntry(prevState => !prevState);

  return (
    <View style={style}>
      <View style={inputStyle.captionContainer}>
        <Text style={textStyle}>{caption}</Text>
      </View>
      <View style={inputStyle.container}>
        <View style={inputStyle.inputContainer}>
          <TextInput style={inputStyle.input} onChangeText={onChangeText} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} secureTextEntry={secureTextEntry} keyboardType={keyboardType}
            value={value} editable={!disabled} autoCapitalize={autoCapitalize} />
          {type === PASSWORD &&
            <NiFeatherButton name={iconName} style={inputStyle.icon} onPress={onPasswordIconPress} />}
        </View>
        {isSelected && <Shadow />}
      </View>
      <Text style={inputStyle.invalid}>{validationMessage}</Text>
    </View>
  );
};

export default Input;
