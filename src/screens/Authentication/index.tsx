import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import NiButton from '../../components/Button';
import NiInput from '../../components/Input';
import NiErrorMessage from '../../components/ErrorMessage';
import styles from './styles';
import { PASSWORD, EMAIL } from '../../core/data/constants';
import { NavigationType } from '../../types/NavigationType';

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Identifiez-vous pour accéder aux informations</Text>
        <NiInput title='Email' type={EMAIL} setValue={setEmail} value={email} darkMode />
        <NiInput title='Mot de Passe' type={PASSWORD} setValue={setPassword} value={password}
          darkMode />
        <NiErrorMessage message={errorMessage}/>
        <TouchableOpacity style={styles.forgotPassword} onPress={goToForgotPassword} hitSlop={{ top: 12, bottom: 12 }}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <NiButton customStyles={{ button: styles.button }} title='Se connecter' onPress={login} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Authentication;
