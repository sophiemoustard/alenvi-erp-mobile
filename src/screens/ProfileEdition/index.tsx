import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import FeatherButton from '../../components/FeatherButton';
import ExitModal from '../../components/modals/ExitModal';
import NiInput from '../../components/form/Input';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiErrorMessage from '../../components/ErrorMessage';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, KEYBOARD_AVOIDING_VIEW_BEHAVIOR, MARGIN } from '../../styles/metrics';
import { Context as AuthContext } from '../../context/AuthContext';
import styles from './styles';
import Users from '../../api/Users';
import asyncStorage from '../../core/helpers/asyncStorage';
import { EMAIL_REGEX, PHONE_REGEX } from '../../core/data/constants';

const ProfileEdition = () => {
  const { loggedUser, refreshLoggedUser } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editedUser, setEditedUser] = useState<any>({
    identity: { firstname: loggedUser?.identity?.firstname, lastname: loggedUser?.identity?.lastname },
    contact: { phone: loggedUser?.contact?.phone },
    local: { email: loggedUser?.local?.email },
  });
  const [initialUserInfo] = useState<any>(editedUser);
  const [validation, setValidation] = useState<any>({ lastName: false, phone: false, email: false, emptyEmail: false });
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigation = useNavigation();

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home', { screen: 'Profile' });
  };

  const saveData = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid) {
        setErrorMessage('');
        const userId = await asyncStorage.getUserId();
        await Users.setUser(userId, editedUser);
        await refreshLoggedUser();
        goBack();
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    }
  };

  const onChangeIdentity = (key: string) => (text: string) => (
    setEditedUser({ ...editedUser, identity: { ...editedUser.identity, [key]: text } })
  );

  const onChangePhone = (text: string) => setEditedUser({ ...editedUser, contact: { phone: text } });

  const onChangeEmail = (text: string) => setEditedUser({ ...editedUser, local: { email: text } });

  const onPressExitModal = () => {
    if (editedUser === initialUserInfo) goBack();
    else setExitConfirmationModal(true);
  };

  const phoneValidation = () => (
    validation.phone && isValidationAttempted ? 'Votre numéro de téléphone n\'est pas valide.' : ''
  );

  const nameValidation = () => (
    validation.lastName && isValidationAttempted ? 'Ce champ est obligatoire.' : ''
  );

  const emailValidation = () => {
    if (validation.email && isValidationAttempted) return 'Votre email n\'est pas valide.';
    if (validation.emptyEmail && isValidationAttempted) return 'Ce champ est obligatoire.';
    return '';
  };

  useEffect(() => {
    setValidation({
      lastName: editedUser.identity.lastname === '',
      phone: !editedUser.contact.phone.match(PHONE_REGEX) && editedUser.contact.phone.length > 0,
      email: !editedUser.local.email.match(EMAIL_REGEX) && editedUser.local.email.length > 0,
      emptyEmail: editedUser.local.email === '',
    });
  }, [editedUser]);

  useEffect(() => {
    const { lastName, phone, email, emptyEmail } = validation;
    if (lastName || phone || email || emptyEmail) setIsValid(false);
    else setIsValid(true);
  }, [validation]);

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <FeatherButton name='x-circle' onPress={onPressExitModal} size={ICON.MD}
            color={GREY[600]} />
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées.'} />
          <Text style={styles.title}>Modifier mes informations</Text>
        </View>
        <View style={styles.container}>
          <NiInput caption='Nom' value={editedUser.identity.lastname} type='lastname'
            onChangeText={onChangeIdentity('lastname')}
            validationMessage={nameValidation()}/>
          <NiInput caption='Prénom' type='firstname' value={editedUser.identity.firstname}
            onChangeText={onChangeIdentity('firstname')} />
          <NiInput caption='Téléphone' type='phone' value={editedUser.contact.phone} onChangeText={onChangePhone}
            validationMessage={phoneValidation()}/>
          <NiInput caption='E-mail' type='email' value={editedUser.local.email} onChangeText={onChangeEmail}
            validationMessage={emailValidation()}/>
        </View>
        <NiPrimaryButton title='Valider' onPress={saveData}/>
        <NiErrorMessage message={errorMessage} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEdition;
