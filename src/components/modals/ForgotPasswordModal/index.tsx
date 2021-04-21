import React, { useState, useEffect } from 'react';
import { Text, View, Modal, ScrollView, TextInput, Keyboard } from 'react-native';
import Authentication from '../../../api/Authentication';
import NiPrimaryButton from '../../form/PrimaryButton';
import FeatherButton from '../../FeatherButton';
import { EMAIL, PHONE, MOBILE } from '../../../core/data/constants';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';
import NiErrorMessage from '../../ErrorMessage';

interface ForgotPasswordModalProps {
  visible: boolean,
  email: string,
  setForgotPasswordModal: (value: boolean) => void,
}

const ForgotPasswordModal = ({ visible, email, setForgotPasswordModal }: ForgotPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenMethod, setChosenMethod] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const inputRefs: Array<any> = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];
  const [code, setCode] = useState<Array<string>>(['', '', '', '']);
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);

  useEffect(() => {
    const isCodeInvalid = !(code.every(char => char !== '' && Number.isInteger(Number(char))));
    if (isCodeInvalid && isValidationAttempted) setErrorMessage('Le format du code est incorrect');
    else setErrorMessage('');
  }, [code, isValidationAttempted]);

  const onChangeText = (char: string, index: number) => {
    setCode(code.map((c, i) => (i === index ? char : c)));
    if (!!char && index + 1 < 4) inputRefs[index + 1].focus();
  };

  const goPreviousAfterEdit = (index: number) => {
    inputRefs[index].focus();
    if (code[index] !== '') onChangeText('', index);
  };

  const checkKeyValue = (key: string, idx: number) => {
    if (key === 'Backspace') {
      if (!idx && code[idx] === '') return;

      if (code[idx] === '') goPreviousAfterEdit(idx - 1);
      else onChangeText('', idx);
    }
  };

  const formatAndSendCode = () => {
    Keyboard.dismiss();
    const formattedCode = `${code[0]}${code[1]}${code[2]}${code[3]}`;
    setIsValidationAttempted(true);
    if (!errorMessage) sendCode(formattedCode);
  };

  const sendCode = async (formattedCode: string) => {
    try {
      setIsLoading(true);
      await Authentication.passwordToken(email, formattedCode);
      onRequestClose();
    } catch (e) {
      setErrorMessage('Oops, le code n\'est pas valide');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setChosenMethod(EMAIL);
      await Authentication.forgotPassword({ email, origin: MOBILE, type: EMAIL });
      setRecipient(email);
    } catch (e) {
      setErrorMessage('Oops, erreur lors de la transmission du numéro de téléphone.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendSMS = async () => {
    try {
      setIsLoading(true);
      setChosenMethod(PHONE);
      const { phone } = await Authentication.forgotPassword({ email, origin: MOBILE, type: PHONE });
      setRecipient(phone || '');
    } catch (e) {
      setErrorMessage('Oops, erreur lors de la transmission du numéro de téléphone.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRequestClose = () => {
    setCode(['', '', '', '']);
    setIsValidationAttempted(false);
    setErrorMessage('');
    setRecipient('');
    setChosenMethod('');
    setForgotPasswordModal(false);
  };

  const beforeCodeSent = () => (
    <>
      <Text style={styles.beforeCodeSentText}>
        Pour réinitialiser votre mot de passe, vous devez d’abord confirmer votre identité par un code temporaire.
      </Text>
      <NiPrimaryButton title='Recevoir le code par e-mail' style={styles.button} onPress={sendEmail}
        loading={isLoading && chosenMethod === EMAIL} />
      <NiPrimaryButton title='Recevoir le code par SMS' style={styles.button} onPress={sendSMS}
        loading={isLoading && chosenMethod === PHONE} />
      <NiErrorMessage message={errorMessage} />
    </>
  );

  const afterCodeSent = () => (
    <>
      <View style={styles.inputContainer}>
        {inputRefs.map((k, idx) => (
          <TextInput ref={(r) => { inputRefs[idx] = r; }} key={`${k}${idx}`} value={code[idx]} keyboardType='number-pad'
            onChangeText={char => onChangeText(char, idx)} style={styles.input} placeholder={'_'} maxLength={1}
            onKeyPress={({ nativeEvent }) => checkKeyValue(nativeEvent.key, idx)} autoFocus={idx === 0} />
        ))}
      </View>
      <NiPrimaryButton title='Valider' style={styles.button} onPress={formatAndSendCode} loading={isLoading} />
      {isValidationAttempted && <NiErrorMessage message={errorMessage} />}
    </>
  );

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.modalContent}>
          <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
            style={styles.goBack} />
          <Text style={styles.title}>Confirmez votre identité</Text>
          {!recipient ? beforeCodeSent() : afterCodeSent()}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ForgotPasswordModal;
