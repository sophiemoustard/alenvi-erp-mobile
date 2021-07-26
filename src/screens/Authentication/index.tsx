import React, { useContext, useState } from 'react';
import { ImageBackground, Text, KeyboardAvoidingView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import NiInput from '../../components/form/Input';
import NiErrorMessage from '../../components/ErrorMessage';
import styles from './styles';
import { PASSWORD, EMAIL } from '../../core/data/constants';
import { NavigationType } from '../../types/NavigationType';
import { hitSlop, KEYBOARD_AVOIDING_VIEW_BEHAVIOR } from '../../styles/metrics';

interface AuthenticationProps {
  navigation: NavigationType,
}

const Authentication = ({ navigation }: AuthenticationProps) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const login = async () => {
    if (email === '' || password === '') return;
    setErrorMessage('');
    try {
      await signIn({ email, password });
    } catch (e) {
      if (e.status === 401) {
        setErrorMessage('L\'e-mail et/ou le mot de passe est incorrect');
      }
    }
  };

  const goToForgotPassword = () => { navigation.navigate('ForgotPassword'); };

  return (
    <ImageBackground
      style={{ height: useWindowDimensions().height }}
      source={require('../../../assets/images/authentication_background_image.jpg')}
    >
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.container}>
        <Text testID='authentication' style={styles.title}>Identifiez-vous pour accéder aux informations</Text>
        <NiInput caption='Email' type={EMAIL} onChangeText={setEmail} value={email} darkMode />
        <NiInput caption='Mot de Passe' type={PASSWORD} onChangeText={setPassword} value={password} darkMode />
        <NiErrorMessage message={errorMessage} />
        <TouchableOpacity style={styles.forgotPassword} onPress={goToForgotPassword} hitSlop={hitSlop}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <NiPrimaryButton style={styles.primaryButton} title='Se connecter' onPress={login} />
        <NiSecondaryButton style={styles.secondaryButton} title='C&apos;est ma première connexion'
          onPress={goToForgotPassword} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Authentication;
