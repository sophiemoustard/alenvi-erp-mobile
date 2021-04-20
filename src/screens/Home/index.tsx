import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import NiButton from '../../components/Button';

const Home = () => (
  <View>
    <Text> Welcome to Compani! :)</Text>
    <NiButton style={ styles.button } title='Me deconnecter' onPress={ () => {} } />
  </View>
);

export default Home;
