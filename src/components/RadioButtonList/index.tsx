import { Feather } from '@expo/vector-icons';
import React from 'react';
import { FlatList, View } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import { GREY, WHITE } from '../../styles/colors';
import styles from './styles';

type RadioButtonOptionsType = { label: string, value: number };

interface RadioButtonProps {
  options: RadioButtonOptionsType[],
}

const renderItem = (item: any) => (
  <BouncyCheckBox size={20} fillColor= {GREY[900]} unfillColor={WHITE} text={item.label} style={styles.checkBox}
    textStyle={styles.text} iconStyle={styles.icon} bounceFriction={5} onPress={() => {}} />
);

const renderSeparator = () => <View style={styles.separator} />;

const RadioButtonList = ({ options }: RadioButtonProps) => (
  <FlatList data={options} keyExtractor={item => item.label}
    renderItem={({ item }) => renderItem(item)} ItemSeparatorComponent={renderSeparator} />
);

export default RadioButtonList;
