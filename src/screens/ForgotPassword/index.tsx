import React, { useEffect, useState, useCallback } from 'react';
import { KeyboardAvoidingView, View, Text, BackHandler } from 'react-native';
import Users from '../../api/Users';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import FeatherButton from '../../components/FeatherButton';
import NiInput from '../../components/form/Input';
import ExitModal from '../../components/modals/ExitModal';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import { EMAIL_REGEX } from '../../core/data/constants';
import { formatEmailForPayload } from '../../core/helpers/utils';
import { ICON, KEYBOARD_AVOIDING_VIEW_BEHAVIOR } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { NavigationType } from '../../types/NavigationType';
import styles from './styles';

interface EmailFormProps {
  navigation: NavigationType,
}

const ForgotPassword = ({ navigation }: EmailFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
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
    if (!email.match(EMAIL_REGEX) && isValidationAttempted) setErrorMessage('Votre e-mail n\'est pas valide');
    else setErrorMessage('');
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
        const exists = await Users.exists({ email: formatEmailForPayload(email) });
        if (!exists) setErrorMessage('Oups ! Cet e-mail n\'est pas reconnu.');
        else setForgotPasswordModal(true);
      }
    } catch (e) {
      setErrorMessage('Une erreur s\'est produite, veuillez réessayer ultérieurement.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.screen}>
        <View style={styles.goBack}>
          <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]}
            disabled={isLoading} />
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title={'Êtes-vous sûr de cela ?'} contentText={'Vous reviendrez à la page d\'accueil.'} />
        </View>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.title}>Quel est votre e-mail ?</Text>
            <NiInput style={styles.input} caption='Email' type='email' onChangeText={setEmail} value={email}
              validationMessage={errorMessage} disabled={isLoading} />
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
