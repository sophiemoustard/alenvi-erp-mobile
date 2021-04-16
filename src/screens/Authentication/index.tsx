import React, { useContext, useState } from 'react';
import { ImageBackground, Text, KeyboardAvoidingView, useWindowDimensions, Platform } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import NiButton from '../../components/Button';
import NiInput from '../../components/Input';
import styles from './styles';
import { PASSWORD, EMAIL } from '../../../src/data/constants';

const Authentication = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <ImageBackground
      style={{ height: useWindowDimensions().height }}
      source={require('../../../assets/images/authentication_background_image.jpg')}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Identifiez-vous pour accéder aux informations</Text>
        <NiInput style={styles.input} title='Email' type={EMAIL} setValue={setEmail} />
        <NiInput style={styles.input} title='Mot de Passe' type={PASSWORD} setValue={setPassword} />
        <NiButton title='Se connecter' onPress={() => { signIn({ email, password }); }} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Authentication;
