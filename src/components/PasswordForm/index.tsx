import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, View, Keyboard, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import FeatherButton from '../FeatherButton';
import NiInput from '../form/Input';
import NiPrimaryButton from '../form/PrimaryButton';
import ExitModal from '../modals/ExitModal';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import styles from './styles';

interface PasswordFormProps {
  goBack: () => void,
}

const PasswordForm = ({ goBack }: PasswordFormProps) => {
  const [behavior, setBehavior] = useState<'padding' | 'height'>('padding');
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const scrollRef = useRef<ScrollView>(null);
  const [passswordError, setPasswordError] = useState<string>('');
  const [confirmationError, setConfirmationError] = useState<string>('');
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') setBehavior('padding');
    else setBehavior('height');
  }, []);

  useEffect(() => {
    const keyboardDidHide = () => Keyboard.dismiss();
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => { Keyboard.removeListener('keyboardDidHide', keyboardDidHide); };
  }, []);

  useEffect(() => {
    const isValid = isValidationAttempted && password.length < 6;
    setPasswordError(isValid ? 'Le mot de passe doit comporter au minimum 6 caractères.' : '');
  }, [password, setPasswordError, isValidationAttempted]);

  useEffect(() => {
    setConfirmationError(password !== confirmation
      ? 'Votre nouveau mot de passe et sa confirmation ne correspondent pas.'
      : '');
  }, [password, confirmation, setConfirmationError, isValidationAttempted]);

  const toggleModal = () => setExitConfirmationModal(!exitConfirmationModal);

  const handlePressConfirmButton = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    goBack();
  };

  const savePassword = () => setIsValidationAttempted(true);

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={toggleModal} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={handlePressConfirmButton} visible={exitConfirmationModal}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées.'}
          onPressCancelButton={toggleModal}/>
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mon mot de passe</Text>
        <NiInput caption="Nouveau mot de passe" value={password} onChangeText={setPassword} type="password"
          validationMessage={passswordError} style={styles.input} />
        <NiInput caption="Confirmer mot de passe" value={confirmation} onChangeText={setConfirmation}
          type="password" validationMessage={confirmationError} style={styles.input} />
        <View style={styles.footer}>
          {/* <NiErrorMessage message={errorMessage} show={error} /> */}
          <NiPrimaryButton title="Valider" onPress={savePassword} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordForm;
