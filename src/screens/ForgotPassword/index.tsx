import { useEffect, useState, useCallback, useReducer } from 'react';
import { KeyboardAvoidingView, View, Text, BackHandler } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Users from '../../api/Users';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import FeatherButton from '../../components/FeatherButton';
import NiInput from '../../components/form/Input';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import { EMAIL, EMAIL_REGEX } from '../../core/data/constants';
import { formatEmail } from '../../core/helpers/utils';
import { ICON, KEYBOARD_AVOIDING_VIEW_BEHAVIOR } from '../../styles/metrics';
import { RootStackParamList } from '../../types/NavigationType';
import styles from './styles';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../reducers/error';

interface EmailFormProps extends StackScreenProps<RootStackParamList> {}

const ForgotPassword = ({ navigation }: EmailFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);

  const hardwareBackPress = useCallback(() => {
    if (!isLoading) setExitConfirmationModal(true);
    return true;
  }, [isLoading]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  useEffect(() => {
    setInvalidEmail(!email.match(EMAIL_REGEX));
    if (!email.match(EMAIL_REGEX) && isValidationAttempted) {
      dispatchError({ type: SET_ERROR, payload: 'Votre e-mail n\'est pas valide' });
    } else dispatchError({ type: RESET_ERROR });
  }, [email, isValidationAttempted]);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  const validateEmail = async () => {
    setIsValidationAttempted(true);
    try {
      if (!invalidEmail) {
        setIsLoading(true);
        const exists = await Users.exists({ email });
        if (!exists) dispatchError({ type: SET_ERROR, payload: 'Oups ! Cet e-mail n\'est pas reconnu.' });
        else setForgotPasswordModal(true);
      }
    } catch (e) {
      dispatchError({ type: SET_ERROR, payload: 'Une erreur s\'est produite, veuillez réessayer ultérieurement.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.screen}>
        <View style={styles.goBack}>
          <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
            disabled={isLoading} />
          <ConfirmationModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title="Êtes-vous sûr(e) de cela ?" contentText="Vous reviendrez à la page d\'accueil." />
        </View>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.title}>Quel est votre e-mail ?</Text>
            <NiInput style={styles.input} caption='Email' type={EMAIL} value={email} disabled={isLoading}
              onChangeText={value => setEmail(formatEmail(value))} validationMessage={error.message} />
          </View>
          <NiPrimaryButton title='Valider' onPress={validateEmail} loading={isLoading} />
        </View>
      </KeyboardAvoidingView>
      <ForgotPasswordModal email={email} setForgotPasswordModal={setForgotPasswordModal}
        visible={forgotPasswordModal} />
    </>
  );
};

export default ForgotPassword;
