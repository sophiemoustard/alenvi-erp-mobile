import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import NiInput from '../../components/form/Input';
import styles from './styles';

interface EventFieldEditionProps {
  buttonTitle: string,
  buttonIcon: JSX.Element,
  disabled: boolean,
  inputTitle: string,
  text: string,
  multiline: boolean,
  onChangeText: (value: string) => void,
}

const EventFieldEdition = ({
  buttonTitle,
  buttonIcon,
  disabled,
  inputTitle,
  text,
  multiline,
  onChangeText,
}: EventFieldEditionProps) => {
  const [displayText, setDisplayText] = useState<boolean>(!!text);

  return (
    <>
      {!displayText && !disabled &&
      <TouchableOpacity style={styles.textContainer} onPress={() => setDisplayText(true)} >
        {buttonIcon}
        <Text style={styles.text}>{buttonTitle}</Text>
      </TouchableOpacity>}
      {displayText && <NiInput style={styles.input} caption={inputTitle} value={text} onChangeText={onChangeText}
        multiline={multiline} disabled={disabled} />}
    </>
  );
};

export default EventFieldEdition;
