import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

interface InputProps {
  title: string,
  style: Object,
}

const Input = ({ title, style }: InputProps) => (
  <View style={{ ...styles.container, ...style }}>
    <Text style={styles.caption}>{title}</Text>
    <TextInput style={styles.input} />
  </View>
);

export default Input;
