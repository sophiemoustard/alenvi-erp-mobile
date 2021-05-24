import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, BackHandler } from 'react-native';
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
import { EMAIL_REGEX, PHONE_REGEX } from '../../core/data/constants';

type editedUserValidType = { lastName: boolean, phone: boolean, email: boolean, emptyEmail: boolean };

const ProfileEdition = () => {
  const { loggedUser, refreshLoggedUser } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editedUser, setEditedUser] = useState<any>({
    identity: { firstname: loggedUser?.identity?.firstname, lastname: loggedUser?.identity?.lastname },
    contact: { phone: loggedUser?.contact?.phone },
    local: { email: loggedUser?.local?.email },
  });
  const [invalid, setInvalid] = useState<editedUserValidType>({
    lastName: false,
    phone: false,
    email: false,
    emptyEmail: false,
  });
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const navigation = useNavigation();

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home', { screen: 'Profile' });
  };

  const saveData = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid && loggedUser?._id) {
        setErrorMessage('');
        setIsLoading(true);

        await Users.setUser(loggedUser._id, editedUser);
        await refreshLoggedUser();

        goBack();
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeIdentity = (key: string) => (text: string) => (
    setEditedUser({ ...editedUser, identity: { ...editedUser.identity, [key]: text } })
  );

  const onChangePhone = (text: string) => setEditedUser({ ...editedUser, contact: { phone: text } });

  const onChangeEmail = (text: string) => setEditedUser({ ...editedUser, local: { email: text } });

  const onPressExitModal = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressExitModal);

    return () => { BackHandler.removeEventListener('hardwareBackPress', onPressExitModal); };
  }, []);

  useEffect(() => {
    setInvalid({
      lastName: editedUser.identity.lastname === '',
      phone: editedUser.contact.phone &&
        (!editedUser.contact.phone.match(PHONE_REGEX) && editedUser.contact.phone.length > 0),
      email: !editedUser.local.email.match(EMAIL_REGEX) && editedUser.local.email.length > 0,
      emptyEmail: editedUser.local.email === '',
    });
  }, [editedUser]);

  useEffect(() => {
    const { lastName, phone, email, emptyEmail } = invalid;
    if (lastName || phone || email || emptyEmail) setIsValid(false);
    else setIsValid(true);
  }, [invalid]);

  useEffect(() => {
    if (invalid.lastName && isValidationAttempted) setNameError('Ce champ est obligatoire.');
    else setNameError('');

    if (invalid.phone && isValidationAttempted) setPhoneError('Votre numéro de téléphone n\'est pas valide.');
    else setPhoneError('');

    if (invalid.email && isValidationAttempted) setEmailError('Votre email n\'est pas valide.');
    else if (invalid.emptyEmail && isValidationAttempted) setEmailError('Ce champ est obligatoire.');
    else setEmailError('');
  }, [invalid, isValidationAttempted]);

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <FeatherButton name='x-circle' onPress={onPressExitModal} size={ICON.MD} color={GREY[600]} />
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées.'} />
          <Text style={styles.title}>Modifier mes informations</Text>
        </View>
        <View style={styles.container}>
          <NiInput caption='Nom' value={editedUser.identity.lastname} type='lastname' validationMessage={nameError}
            onChangeText={onChangeIdentity('lastname')} />
          <NiInput caption='Prénom' type='firstname' value={editedUser.identity.firstname}
            onChangeText={onChangeIdentity('firstname')} />
          <NiInput caption='Téléphone' type='phone' value={editedUser.contact.phone} validationMessage={phoneError}
            onChangeText={onChangePhone} />
          <NiInput caption='E-mail' type='email' value={editedUser.local.email} validationMessage={emailError}
            onChangeText={onChangeEmail} />
        </View>
        <NiPrimaryButton title='Valider' onPress={saveData} loading={isLoading} />
        <NiErrorMessage message={errorMessage} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEdition;
