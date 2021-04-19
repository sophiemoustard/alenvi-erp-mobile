import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import Users from '../../api/Users';
import NiButton from '../../components/Button';
import FeatherButton from '../../components/FeatherButton';
import NiInput from '../../components/Input';
import ExitModal from '../../components/modals/ExitModal';
import { EMAIL_REGEX } from '../../core/data/constants';
import { ICON } from '../../styles/metrics';
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
        const exists = await Users.exists({ email });
        if (!exists) setErrorMessage('Oups ! Cet e-mail n\'est pas reconnu.');
      }
    } catch (e) {
      setErrorMessage('Une erreur s\'est produite, veuillez réessayer ultérieurement.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]}
          disabled={isLoading} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vous reviendrez à la page d\'accueil.'} />
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.title}>Quelle est votre e-mail ?</Text>
          <NiInput style={styles.input} title='Email' type='email' setValue={setEmail} value={email}
            validationMessage={errorMessage} disabled={isLoading} />
        </View>
        <NiButton title='Valider' onPress={validateEmail} loading={isLoading} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
