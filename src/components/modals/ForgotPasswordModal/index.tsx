import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Authentication from '../../../api/Authentication';
import NiPrimaryButton from '../../form/PrimaryButton';
import FeatherButton from '../../FeatherButton';
import { EMAIL, PHONE, MOBILE } from '../../../core/data/constants';
import { ICON, IS_LARGE_SCREEN } from '../../../styles/metrics';
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
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const navigation = useNavigation();

  const keyboardDidHide = () => setIsKeyboardOpen(false);
  const keyboardDidShow = () => setIsKeyboardOpen(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
    };
  }, []);

  useEffect(() => {
    const isCodeInvalid = code.some(char => char === '' || !Number.isInteger(Number(char)));
    if (recipient && isCodeInvalid) setErrorMessage('Le format du code est incorrect');
    else setErrorMessage('');
  }, [code, recipient]);

  const onChangeText = (char: string, index: number) => {
    setIsValidationAttempted(false);
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

  const validateCode = () => {
    Keyboard.dismiss();
    setIsValidationAttempted(true);
  };

  const onRequestClose = useCallback(() => {
    setCode(['', '', '', '']);
    setIsKeyboardOpen(false);
    setIsValidationAttempted(false);
    setErrorMessage('');
    setRecipient('');
    setChosenMethod('');
    setForgotPasswordModal(false);
  }, [setForgotPasswordModal]);

  const sendCode = useCallback(async (formattedCode: string) => {
    try {
      setIsLoading(true);
      const checkToken = await Authentication.passwordToken(email, formattedCode);
      onRequestClose();
      navigation.navigate('PasswordReset', { userId: checkToken.user._id, email, token: checkToken.token });
    } catch (e) {
      setErrorMessage('Oops, le code n\'est pas valide');
    } finally {
      setIsLoading(false);
    }
  }, [email, onRequestClose, navigation]);

  useEffect(() => {
    if (!errorMessage && isValidationAttempted) sendCode(`${code[0]}${code[1]}${code[2]}${code[3]}`);
  }, [sendCode, code, errorMessage, isValidationAttempted]);

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setChosenMethod(EMAIL);
      await Authentication.forgotPassword({ email, origin: MOBILE, type: EMAIL });
      setRecipient(email);
    } catch (e) {
      setErrorMessage('Oops, erreur lors de la transmission de l\'email.');
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

  const beforeCodeSent = () => (
    <>
      <Text style={styles.beforeCodeSentText}>
        Pour réinitialiser votre mot de passe, vous devez d’abord confirmer votre identité par un code temporaire.
      </Text>
      <NiPrimaryButton title='Recevoir le code par e-mail' style={styles.button} onPress={sendEmail}
        loading={isLoading && chosenMethod === EMAIL} />
      <NiPrimaryButton title='Recevoir le code par SMS' style={styles.button} onPress={sendSMS}
        loading={isLoading && chosenMethod === PHONE} />
      {!!chosenMethod && <NiErrorMessage message={errorMessage} />}
    </>
  );

  const afterCodeSent = () => (
    <>
      {(IS_LARGE_SCREEN || !isKeyboardOpen) &&
        <Text style={styles.afterCodeSent}>
          <Text style={styles.afterCodeSentText}>Nous avons envoyé un </Text>
          <Text style={styles.afterCodeSentText}>{chosenMethod === EMAIL ? 'email ' : 'sms '}</Text>
          <Text style={styles.afterCodeSentText}>à </Text>
          <Text style={styles.recipient}>{recipient} </Text>
          <Text style={styles.afterCodeSentText}>avec le code temporaire. </Text>
          {chosenMethod === EMAIL && <Text style={styles.afterCodeSentText}>
              Si vous ne l’avez pas reçu, vérifiez vos emails indésirables, ou réessayez.
          </Text>
          }
        </Text>
      }
      <View style={styles.inputContainer}>
        {inputRefs.map((k, idx) => (
          <TextInput ref={(r) => { inputRefs[idx] = r; }} key={`${k}${idx}`} value={code[idx]} keyboardType='number-pad'
            onChangeText={char => onChangeText(char, idx)} style={styles.input} placeholder={'_'} maxLength={1}
            onKeyPress={({ nativeEvent }) => checkKeyValue(nativeEvent.key, idx)} autoFocus={idx === 0} />
        ))}
      </View>
      <NiPrimaryButton title='Valider' style={styles.button} onPress={validateCode} loading={isLoading} />
      {isValidationAttempted && <NiErrorMessage message={errorMessage} />}
    </>
  );

  return (
    <>
      {visible && <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} style={styles.goBack} />
          <ScrollView keyboardShouldPersistTaps='handled'>
            <Text style={styles.title}>Confirmez votre identité</Text>
            {!recipient ? beforeCodeSent() : afterCodeSent()}
          </ScrollView>
        </View>
      </View>}
    </>
  );
};

export default ForgotPasswordModal;
