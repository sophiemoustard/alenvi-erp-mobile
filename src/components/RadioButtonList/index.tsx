import React from 'react';
import { Text, FlatList, View } from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  list: {
    label: string,
    value: number,
  }[],
}

const renderItem = (item: any) => <Text>{item.label}</Text>;

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ list }: RadioButtonProps) => (
  <View>
    <FlatList data={list} keyExtractor={ item => item.label } style={styles.container}
      renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
  </View>
);

export default RadioButtonList;
