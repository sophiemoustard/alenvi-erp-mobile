import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { WHITE } from '../../styles/colors';

type RadioButtonOptionsType = { label: string, value: number };

interface RadioButtonProps {
  options: RadioButtonOptionsType[],
}

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ options }: RadioButtonProps) => {
  const [icon, setIcon] = useState<any>('radio-button-unchecked');

  const onPressCheckbox = (checked: boolean | undefined) => (checked
    ? setIcon('radio-button-checked') : setIcon('radio-button-unchecked')
  );

  const renderItem = (item: any) => (
    <BouncyCheckBox text={item.label} style={styles.checkBox} textStyle={styles.text} iconStyle={styles.icon}
      onPress={onPressCheckbox} iconComponent={<MaterialIcons name={icon} size={25}/>}
      fillColor={WHITE} />
  );
  return (
    <FlatList data={options} keyExtractor={item => item.label} style={styles.container}
      renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
  );
};

export default RadioButtonList;
