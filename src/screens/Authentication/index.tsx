import React from 'react';
import { ImageBackground, Text, View, useWindowDimensions } from 'react-native';
import NiButton from '../../components/Button';
import NiInput from '../../components/Input';
import styles from './styles';

const Authentication = () => (
  <ImageBackground
    style={{ height: useWindowDimensions().height }}
    source={require('../../../assets/images/authentication_background_image.jpg')}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Identifiez-vous pour accéder aux informations</Text>
      <NiInput style={styles.input} title='Email' />
      <NiInput style={styles.input} title='Mot de Passe' />
      <NiButton title='Se connecter' onPress={() => {}} />
    </View>
  </ImageBackground>
);

export default Authentication;
