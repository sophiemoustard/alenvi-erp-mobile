import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { BLACK, GREY } from '../../styles/colors';

type RadioButtonOptionsType = { label: string, value: number };

interface RadioButtonProps {
  options: RadioButtonOptionsType[],
}

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ options }: RadioButtonProps) => {
  const [checkedRadioButton, setCheckedRadioButton] = useState<Number | null>(null);

  const onPressCheckbox = (value: Number) =>
    setCheckedRadioButton(prevValue => (prevValue === value ? null : value));

  const renderItem = (item: any) => {
    const iconName = checkedRadioButton === item.value ? 'radio-button-checked' : 'radio-button-unchecked';
    const iconColor = checkedRadioButton === item.value ? BLACK : GREY[600];
    const textStyle = checkedRadioButton === item.value ? styles.text : { ...styles.text, color: GREY[600] };

    return (
      <TouchableOpacity style={styles.container} onPress={() => onPressCheckbox(item.value)}>
        <MaterialIcons style={styles.icon} size={20} name={iconName} color={iconColor} />
        <Text style={textStyle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList data={options} keyExtractor={item => item.label}
      renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
  );
};

export default RadioButtonList;
