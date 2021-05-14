import React from 'react';
import { Text, FlatList, View } from 'react-native';
import styles from './styles';

type RadioButtonOptionType = { label: string, value: number };

interface RadioButtonProps {
  options: RadioButtonOptionType[],
}

const renderItem = (item: any) => <Text>{item.label}</Text>;

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ options }: RadioButtonProps) => (
  <>
    <FlatList data={options} keyExtractor={item => item.label} style={styles.container}
      renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
  </>
);

export default RadioButtonList;
