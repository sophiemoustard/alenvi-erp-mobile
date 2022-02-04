import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NiInput from '../../components/form/Input';
import styles from './styles';

interface EventFieldEditionProps {
  buttonTitle: string,
  buttonIcon: JSX.Element,
  disabled: boolean,
  inputTitle: string,
  text: string,
  onChangeText: (value: string) => void,
  multiline?: boolean,
  suffix?: string,
  type?: string,
  errorMessage?: string,
}

const EventFieldEdition = ({
  buttonTitle,
  buttonIcon,
  disabled,
  inputTitle,
  text,
  onChangeText,
  multiline = false,
  suffix = '',
  type = '',
  errorMessage = '',
}: EventFieldEditionProps) => {
  const [displayText, setDisplayText] = useState<boolean>(!!text);

  return (
    <View style={styles.container}>
      {!displayText && !disabled &&
        <TouchableOpacity style={styles.textContainer} onPress={() => setDisplayText(true)}>
          {buttonIcon}
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>}
      {displayText &&
        <NiInput caption={inputTitle} value={text} onChangeText={onChangeText} multiline={multiline}
          disabled={disabled} suffix={suffix} type={type} validationMessage={errorMessage} />}
    </View>
  );
};

export default EventFieldEdition;
