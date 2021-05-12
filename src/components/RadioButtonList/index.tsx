import React from 'react';
import { Text, FlatList, View } from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  list: {
    label: string,
    value: number,
  }[],
  optionSelected: boolean,
}

//const renderSeparator = () => {};
const renderItem = (item: any) => <Text>{item.label}</Text>;

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ list, optionSelected }: RadioButtonProps) => {
  const a = 0;
  return (
    <View>
      <FlatList data={list} keyExtractor={ item => item.label } style={styles.container}
        renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
    </View>
  );
};

export default RadioButtonList;
