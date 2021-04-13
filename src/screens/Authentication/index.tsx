import React from 'react';
import { ImageBackground, Text, KeyboardAvoidingView, useWindowDimensions, Platform } from 'react-native';
import NiButton from '../../components/Button';
import NiInput from '../../components/Input';
import styles from './styles';
import { PASSWORD } from '../../../src/data/constants';

const Authentication = () => (
  <ImageBackground
    style={{ height: useWindowDimensions().height }}
    source={require('../../../assets/images/authentication_background_image.jpg')}
  >
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Identifiez-vous pour accéder aux informations</Text>
      <NiInput style={styles.input} title='Email' />
      <NiInput style={styles.input} title='Mot de Passe' type={PASSWORD} />
      <NiButton title='Se connecter' onPress={() => {}} />
    </KeyboardAvoidingView>
  </ImageBackground>
);

export default Authentication;
