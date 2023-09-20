import { useContext, useReducer, useState } from 'react';
import { ImageBackground, Text, KeyboardAvoidingView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AxiosError } from 'axios';
import { Context as AuthContext } from '../../context/AuthContext';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import NiInput from '../../components/form/Input';
import NiErrorMessage from '../../components/ErrorMessage';
import styles from './styles';
import { PASSWORD, EMAIL } from '../../core/data/constants';
import { formatEmail } from '../../core/helpers/utils';
import { RootStackParamList } from '../../types/NavigationType';
import { hitSlop, KEYBOARD_AVOIDING_VIEW_BEHAVIOR } from '../../styles/metrics';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../reducers/error';

interface AuthenticationProps extends StackScreenProps<RootStackParamList> {}

const Authentication = ({ navigation }: AuthenticationProps) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);

  const login = async () => {
    if (email === '' || password === '') return;
    dispatchError({ type: RESET_ERROR });
    try {
      await signIn({ email, password });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          dispatchError({ type: SET_ERROR, payload: 'L\'e-mail et/ou le mot de passe est incorrect.' });
        } else dispatchError({ type: SET_ERROR, payload: 'Impossible de se connecter.' });
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
        <NiInput caption='Email' type={EMAIL} onChangeText={value => setEmail(formatEmail(value))}
          value={email} darkMode />
        <NiInput caption='Mot de passe' type={PASSWORD} onChangeText={setPassword} value={password} darkMode />
        {error.value && <NiErrorMessage message={error.message} />}
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
